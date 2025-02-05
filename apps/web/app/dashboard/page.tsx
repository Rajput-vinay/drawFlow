"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Navigation } from '../../component/Navigation';
import { CreateRoomModal } from '../../component/CreateRoomModal';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FindRoomModal } from '../../component/FindRoomModel';
import Card from '../../component/Card';

function Dashboard() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showFindRoom, setShowFindRoom] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const [findRoom, setFindRoom] = useState('');
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    if (!storedToken) {
      router.push('/signin');
    }
  }, [router]);

  const handleCreateRoom = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/createRoom`, {
        name: roomName
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;
      if (data.error) {
        toast.error("Failed to create room", data.error);
        return;
      }
      toast.success('Room created successfully');
      router.push(`/canvas/${data.roomId}`);
      setShowCreateRoom(false);
      setRoomName('');
    } catch (error: any) {
      toast.error('Failed to create room', error.message);
    }
  }, [roomName, router, token]);

  const handlefindRoom = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/room/${findRoom}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;
      if (data.error) {
        toast.error("Room not found", data.error);
        return;
      }
      toast.success('Room found successfully');
      router.push(`/canvas/${data.room.id}`);
      setShowFindRoom(false);
      setFindRoom('');
    } catch (error: any) {
      toast.error('Failed to find room', error.message);
    }
  }, [findRoom, router, token]);

  return (
    token && (
      <div className="min-h-screen bg-gray-50">
        <Navigation showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header for Rooms Tab */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Users Room
            </h1>
            <div className='flex space-x-4'>
            <button
              onClick={() => setShowCreateRoom(true)}
              className="flex items-center px-4 py-2  bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5 mr-2 hidden md:block" />
              Create Room
            </button>

            <button
              onClick={() => setShowFindRoom(true)}
              className="flex items-center lg:px-4 lg:py-2 px-2 py:1  bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5 mr-2 hidden md:block" />
              Enter Room
            </button>
            </div>
          </div>

          <Card />

        </main>

        <CreateRoomModal
          show={showCreateRoom}
          onClose={() => setShowCreateRoom(false)}
          roomName={roomName}
          setRoomName={setRoomName}
          onSubmit={handleCreateRoom}
        />

        <FindRoomModal
          show={showFindRoom}
          onClose={() => setShowFindRoom(false)}
          findRoom={findRoom}
          setFindRoom={setFindRoom}
          onSubmit={handlefindRoom}
        />
      </div>
    )
  );
}

export default Dashboard;
