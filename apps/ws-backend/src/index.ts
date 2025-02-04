import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { prismaClient } from "@repo/database/client";

dotenv.config();
const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: any;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

function verifyUser(token: string): string | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    console.log("decoded", decoded);
    return decoded?.userId || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

wss.on("connection", (ws, request) => {
  try {
    const url = request.url;
    if (!url) return ws.close(4001, "Missing URL");
    console.log("url", url);
    const queryParams = new URLSearchParams(url.split("?")[1]);

    const token = queryParams.get("token");
    console.log("token ws", token);
    if (!token) return ws.close(4002, "Missing token");

    const userId = verifyUser(token);
    if (!userId) return ws.close(4003, "Invalid token");

    const user: User = { userId, rooms: [], ws };
    users.push(user);

    ws.on("message", async (data) => {
      try {
        const parsedData = JSON.parse(
          typeof data === "string" ? data : data.toString()
        );
        console.log("Message received:", parsedData);

        if (parsedData.type === "join_room") {
          user.rooms.push(parsedData.roomId);
        }

        if (parsedData.type === "leave_room") {
          user.rooms = user.rooms.filter((room) => room !== parsedData.roomId);
        }

        if (parsedData.type === "chat") {
          const { roomId, message } = parsedData;
          await prismaClient.chat.create({
            data: { roomId: Number(roomId), message, userId },
          });

          users.forEach((u) => {
            if (u.rooms.includes(roomId)) {
              u.ws.send(JSON.stringify({ type: "chat", message, roomId }));
            }
          });
        }


        if (parsedData.type === "erase") {
          const { roomId, message } = parsedData;
          await prismaClient.chat.deleteMany({
            where: { message, roomId: Number(roomId) },
          });



          users.forEach((u) => {
            if (u.rooms.includes(roomId) && u.ws !== ws) {
              u.ws.send(JSON.stringify({ type: "erase", message, roomId }));
            }
          });
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    });

    ws.on("close", () => {
      console.log(`Connection closed for user: ${userId}`);
    });
  } catch (error) {
    console.error("Error during WebSocket connection:", error);
    ws.close(1011, "Internal server error");
  }
});
