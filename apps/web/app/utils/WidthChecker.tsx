"use client";

import { useEffect, useState } from "react";
import { RoomCanvas } from "../../canvas/RoomCanvas";


export function WidthChecker({ roomId }: { roomId: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 428);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <div className="text-center p-4 bg-gray-200">
      <p>Sorry, the canvas is not compatible with mobile devices.</p>
    </div>
  ) : (
    <RoomCanvas roomId={roomId} />
  );
}
