import React from 'react';
import { Search, Grid, List } from 'lucide-react';

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: 'drawings' | 'rooms';
  viewMode?: 'grid' | 'list';
  setViewMode?: (mode: 'grid' | 'list') => void;
};

export function SearchBar({ searchQuery, setSearchQuery, activeTab, viewMode, setViewMode }: SearchBarProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>
      {activeTab === 'drawings' && setViewMode && (
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}