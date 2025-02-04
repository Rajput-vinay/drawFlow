import { useEffect, useRef, useState } from "react";
import { Game } from "../drawComponent/game";
import Toolbar from "./toolbar";

interface CanvasProps {
    roomId: string;
    socket: WebSocket;
}

export type Tool = "rect" | "circle" | "pencil" | "erase" | "line" | "text";

export function Canvas({ roomId, socket }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [activeTool, setActiveTool] = useState<Tool>("rect");
    const [game, setGame] = useState<Game | null>(null);

    // Resize event listener to update canvas dimensions
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Initialize Game instance
    useEffect(() => {
        if (canvasRef.current) {
            const newGame = new Game(canvasRef.current, roomId, socket);
            setGame(newGame);

            return () => {
                newGame.destroy();
            };
        }
    }, [roomId, socket]);

    // Update game tool whenever activeTool changes
    useEffect(() => {
        window.selectedTool = activeTool;
    }, [activeTool]);

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height}></canvas>
            <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
        </div>
    );
}
