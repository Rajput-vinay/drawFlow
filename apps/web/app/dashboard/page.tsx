"use client"

import React, { useCallback, useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Navigation } from '../../component/Navigation';
import { TabSelector } from '../../component/TabSelector';
import { SearchBar } from '../../component/SearchBar';
import { DrawingList } from '../../component/DrawingList';
import { RoomList } from '../../component/RoomList';
import { CreateRoomModal } from '../../component/CreateRoomModal';
import { useRouter } from 'next/navigation';
import axios from 'axios'
import { toast } from 'react-hot-toast'

function Dashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [activeTab, setActiveTab] = useState<'drawings' | 'rooms'>('rooms');
  
  // New room form state
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();


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
        name:roomName
    }, {
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      }
    });

      const data = response.data;
      if (data.error) {
        toast.error("data not ",data.error);
        return;
      }
      toast.success('Room created successfully');
      router.push(`/canvas/${data.roomId}`); 
      setShowCreateRoom(false);
      setRoomName('');
    } catch (error: any) {
      toast.error('Failed to create room',error.message);
    }
  }, [roomName, router]);

  return (
    token && (
      <div className="min-h-screen bg-gray-50">
        <Navigation showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === 'drawings' ? 'My Drawings' : 'Collaboration Rooms'}
            </h1>
            <button
              onClick={() => activeTab === 'rooms' ? setShowCreateRoom(true) : undefined}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5 mr-2" />
              {activeTab === 'drawings' ? 'New Drawing' : 'Create Room'}
            </button>
          </div>

          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {activeTab === 'drawings' ? (
            <DrawingList drawings={[]} viewMode={viewMode} />
          ) : (
            <RoomList rooms={[]} />
          )}
        </main>

        <CreateRoomModal
          show={showCreateRoom}
          onClose={() => setShowCreateRoom(false)}
          roomName={roomName}
          setRoomName={setRoomName}
          onSubmit={handleCreateRoom}
        />
      </div>
    )
  );
}

export default Dashboard;
