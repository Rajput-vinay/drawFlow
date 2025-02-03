
import { X } from 'lucide-react';

type CreateRoomModalProps = {
  show: boolean;
  onClose: () => void;
  roomName: string;
  setRoomName: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function CreateRoomModal({
  show,
  onClose,
  roomName,
  setRoomName,
  onSubmit
}: CreateRoomModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Create New Room</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">
              Room Name
            </label>
            <input
              id="roomName"
              type="text"
              required
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Enter room name"
            />
          </div>


          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}