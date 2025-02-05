// 'use client';

import { RoomCanvas } from "../../../canvas/RoomCanvas";
// import { useEffect, useState } from "react";

type params = Promise< { roomId: string } >;

export default async function CanvasPage({ params }: {
  params: params
}) {
  const { roomId } = await params;
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const checkMobileView = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };
  //   checkMobileView();
  //   window.addEventListener("resize", checkMobileView);
  //   return () => window.removeEventListener("resize", checkMobileView);
  // }, []);

  return (
    <div>
      {/* {isMobile ? (
        <div className="text-center p-4 bg-gray-200">
          <p>Sorry, the canvas is not compatible with mobile devices.</p>
        </div>
      ) : ( */}
        <RoomCanvas roomId={roomId} />
      {/* )} */}
    </div>
  );
}