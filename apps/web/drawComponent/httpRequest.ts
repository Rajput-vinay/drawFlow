
import axios from "axios";

// Fetch existing shapes from API
export async function getExistingShapes(roomId: string): Promise<Shape[]> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/chats/${roomId}`);
      console.log("📩 Existing Shapes Response:", response.data);
      return response.data.message.map((m: { message: string }) => JSON.parse(m.message));
    } catch (error) {
      console.error("❌ Error fetching shapes from API:", error);
      return [];
    }
  }