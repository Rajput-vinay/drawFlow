'use client';

import { useEffect, useState } from "react";
import { Canvas } from "./Canavas";

interface RoomCanvasProps {
    roomId: string;
}

export function RoomCanvas({ roomId }: RoomCanvasProps) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const wss = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}?token=${localStorage.getItem("token")}`);

        wss.onopen = () => {
            setSocket(wss);
            const data = JSON.stringify({
                type: "join_room",
                roomId
            });
            console.log(data);
            wss.send(data);
        };

        // Cleanup WebSocket connection when the component unmounts
        return () => {
            if (wss.readyState === WebSocket.OPEN) {
                wss.close();
            }
        };
    }, [roomId]); // Only re-run effect if roomId changes

    if (!socket) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Canvas roomId={roomId} socket={socket} />
        </div>
    );
}
