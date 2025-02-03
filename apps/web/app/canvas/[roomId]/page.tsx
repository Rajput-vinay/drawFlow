"use client";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "../../drawComponent/index";





export default function canvas (){
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const [width,setWidth] = useState(500);
 const [height,setHeight] = useState(500);

 useEffect(() =>{
 const windowWidth = window.innerWidth;
 const windowHeight = window.innerHeight;
 setWidth(windowWidth);
 setHeight(windowHeight);
    
 },[width,height])

 useEffect(() =>{
    if(canvasRef.current){
        initDraw({ canvas: canvasRef.current })
    }
 },[canvasRef])
    return (
        <div>
            <canvas ref = {canvasRef} width={width} height={height}></canvas>
        </div>
    )
}