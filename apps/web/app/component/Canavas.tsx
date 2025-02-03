import { useEffect, useRef, useState } from "react";
import { initDraw } from "../drawComponent";

interface CanvasProps {
    roomId: string;
    socket: WebSocket;
}

export function Canvas({ roomId, socket }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    // Only set width and height when the component mounts or window resizes
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Initialize drawing on the canvas after it's mounted
    useEffect(() => {
        if (canvasRef.current) {
            initDraw({ canvas: canvasRef.current, roomId,socket });
        }
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} width={2000} height={1000}></canvas>
        </div>
    );
}
