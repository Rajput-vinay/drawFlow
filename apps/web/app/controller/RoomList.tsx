import React from 'react';
import { MoreVertical, Lock, Globe, Users } from 'lucide-react';

export type Room = {
  id: string;
  name: string;
  description: string;
  members: number;
  isPrivate: boolean;
  created: string;
};

type RoomListProps = {
  rooms: Room[];
};

export function RoomList({ rooms }: RoomListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <div key={room.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                {room.isPrivate ? (
                  <Lock className="w-4 h-4 text-gray-400" />
                ) : (
                  <Globe className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">{room.description}</p>
            </div>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {room.members} members
            </div>
            <span>Created {room.created}</span>
          </div>
        </div>
      ))}
    </div>
  );
}