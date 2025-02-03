
import { Star, Share2, Trash2, MoreVertical } from 'lucide-react';

export type Drawing = {
  id: string;
  title: string;
  preview: string;
  created: string;
  starred: boolean;
};

type DrawingListProps = {
  drawings: Drawing[];
  viewMode: 'grid' | 'list';
};

export function DrawingList({ drawings, viewMode }: DrawingListProps) {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drawings.map((drawing) => (
          <div key={drawing.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-video">
              <img
                src={drawing.preview}
                alt={drawing.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <button 
                className={`absolute top-2 right-2 p-1 rounded-full ${
                  drawing.starred ? 'bg-yellow-100 text-yellow-500' : 'bg-white text-gray-400 hover:text-gray-600'
                }`}
              >
                <Star className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{drawing.title}</h3>
                  <p className="text-sm text-gray-500">Created {drawing.created}</p>
                </div>
                <div className="relative">
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {drawings.map((drawing, index) => (
        <div key={drawing.id} className={`flex items-center p-4 ${
          index !== drawings.length - 1 ? 'border-b border-gray-200' : ''
        }`}>
          <img
            src={drawing.preview}
            alt={drawing.title}
            className="w-16 h-12 object-cover rounded"
          />
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{drawing.title}</h3>
            <p className="text-sm text-gray-500">Created {drawing.created}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className={`p-1 rounded-full ${
              drawing.starred ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'
            }`}>
              <Star className="w-5 h-5" />
            </button>
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-600">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-1 rounded-full text-gray-400 hover:text-red-600">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}