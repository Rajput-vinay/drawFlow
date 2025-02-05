import { useEffect, useRef, useState } from "react";
import { Game } from "../drawComponent/game";
import Link from "next/link";
import Toolbar from "./toolbar";
import LeftToolBar from "./leftToolbar";
import Button from "../component/Button"
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
    const [activeBackgroundColor, setActiveBackgroundColor] = useState<string>("#000");
    const [activeStrokeColor, setActiveStrokeColor] = useState<string>("#fff");
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
        window.selectedBackgroundColor = activeBackgroundColor;
        window.selectedStrokeColor = activeStrokeColor;
        game?.updateBackgroundColor()
        game?.updateStrokeColor()
    }, [activeTool, activeBackgroundColor, activeStrokeColor,game]);

    console.log("window.selcted bg",window.selectedBackgroundColor);
    return (
        <div className="overflow-hidden">
            <Link href="/dashboard">
            <Button />
            </Link>
          
            <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
            <canvas ref={canvasRef} width={width} height={height}></canvas>
            <LeftToolBar 
            activeBackgroundColor={activeBackgroundColor} 
            setActiveBackgroundColor ={setActiveBackgroundColor}
            activeStrokeColor={activeStrokeColor}
            setActiveStrokeColor={setActiveStrokeColor}
            />
        </div>
    );
}
