import axios from 'axios';

interface Shape {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface InitDrawProps {
  canvas: HTMLCanvasElement;
  roomId: string;
  socket: WebSocket;
}

export async function initDraw({ canvas, roomId, socket }: InitDrawProps) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let existingShapes: Shape[] = [];

  // Explicitly set canvas size to avoid distortion
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  try {
    console.log("🔹 Fetching existing shapes for room:", roomId);
    existingShapes = await getExistingShapes(roomId);
    console.log("✅ Existing Shapes:", existingShapes);
    drawCanvas(existingShapes, canvas, ctx);
  } catch (error) {
    console.error("❌ Error fetching existing shapes:", error);
  }

  // Handle incoming WebSocket messages
  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      if (message.type === "chat") {
        const receivedShape: Shape = JSON.parse(message.message);
        existingShapes.push(receivedShape);
        drawCanvas(existingShapes, canvas, ctx);
      }
    } catch (error) {
      console.error("❌ Error parsing WebSocket message:", error);
    }
  };

  let startX = 0;
  let startY = 0;
  let isDrawing = false;

  // Handle mouse down (start drawing)
  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
  });

  // Handle mouse up (finish drawing)
  canvas.addEventListener("mouseup", (e) => {
    if (!isDrawing) return;
    isDrawing = false;

    const width = e.offsetX - startX;
    const height = e.offsetY - startY;

    const shape: Shape = { type: "rect", x: startX, y: startY, width, height };
    existingShapes.push(shape);

    // Send shape data to WebSocket
    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify(shape),
        roomId,
      })
    );

    drawCanvas(existingShapes, canvas, ctx);
  });

  // Handle real-time drawing effect
  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    const width = e.offsetX - startX;
    const height = e.offsetY - startY;

    drawCanvas(existingShapes, canvas, ctx);

    // Preview the rectangle while drawing
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.strokeRect(startX, startY, width, height);
  });
}

// Function to draw all shapes on the canvas
function drawCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const shape of existingShapes) {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255, 255, 255, 1)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  }
}

// Fetch existing shapes from API
async function getExistingShapes(roomId: string): Promise<Shape[]> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chats/${roomId}`);
    console.log("📩 Existing Shapes Response:", response.data);
    return response.data.message.map((m: { message: string }) => JSON.parse(m.message));
  } catch (error) {
    console.error("❌ Error fetching shapes from API:", error);
    return [];
  }
}
