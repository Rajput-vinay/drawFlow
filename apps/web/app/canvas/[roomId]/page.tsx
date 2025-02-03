import { RoomCanvas } from "../../component/RoomCanvas";



interface CanvasProps {
    params:{
        roomId: string;
        }
    }

export default async function canvasPage (params: CanvasProps){
 const roomId = await(params.roomId);
    return (
        <RoomCanvas roomId={roomId}/>
    )
}