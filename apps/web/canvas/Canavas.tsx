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
    const [game, setGame] = useState<Game>();

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
            const game = new Game(canvasRef.current, roomId, socket);
            setGame(game);

            return () => {
                game.destroy();
            };
        }
    }, [canvasRef, roomId, socket]);

    useEffect(() => {
        if (game && activeTool) {
            game.setTool(activeTool);
        }
    }, [activeTool, game]);

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height}></canvas>
            <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
        </div>
    );
}
