import React from 'react';

type TabSelectorProps = {
  activeTab: 'drawings' | 'rooms';
  setActiveTab: (tab: 'drawings' | 'rooms') => void;
};

export function TabSelector({ activeTab, setActiveTab }: TabSelectorProps) {
  return (
    <div className="flex space-x-4 mb-8">
      <button
        onClick={() => setActiveTab('rooms')}
        className={`px-4 py-2 rounded-lg font-medium ${
          activeTab === 'rooms'
            ? 'bg-purple-100 text-purple-600'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Rooms
      </button>
      <button
        onClick={() => setActiveTab('drawings')}
        className={`px-4 py-2 rounded-lg font-medium ${
          activeTab === 'drawings'
            ? 'bg-purple-100 text-purple-600'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Drawings
      </button>
    </div>
  );
}