import { WidthChecker } from "../../utils/WidthChecker";

type Params = Promise<{ roomId: string }>;

export default async function CanvasPage({ params }: { params: Params }) {
  const { roomId } = await params; // Resolve the promise

  return <WidthChecker roomId={roomId} />;
}
