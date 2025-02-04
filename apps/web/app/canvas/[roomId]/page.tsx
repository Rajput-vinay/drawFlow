import { RoomCanvas } from "../../../canvas/RoomCanvas";

export default async function CanvasPage({ params }: { params: { roomId: string } }) {
  const { roomId } = await params; // Await params before accessing properties

  console.log("CanvasPage roomId:", roomId);

  return <RoomCanvas roomId={roomId} />;
}
