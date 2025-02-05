import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function Card() {
  const [data, setData] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  async function getAllUser() {
    if (!token) {
      toast.error('No token found, please login.');
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/getAllRoom`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        setData(response.data.rooms); // Update based on the response structure
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch data.');
      console.error('Error fetching users:', error);
    }
  }

  useEffect(() => {
    if (token) getAllUser();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rooms</h2>
      <ul className="space-y-4">
        {data.length > 0 ? (
          data.map((room: any) => (
            <li key={room.id} className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-gray-800">{room.slug}</span>
                <span className="text-sm text-gray-500">{new Date(room.createdAt).toLocaleString()}</span>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No rooms available.</p>
        )}
      </ul>
    </div>
  );
}
