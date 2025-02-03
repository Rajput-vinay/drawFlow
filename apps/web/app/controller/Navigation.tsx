import React from 'react';

import { Shapes, Bell, ChevronDown, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

type NavigationProps = {
  showUserMenu: boolean;
  setShowUserMenu: (show: boolean) => void;
};

export function Navigation({ showUserMenu, setShowUserMenu }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Shapes className="w-8 h-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">DrawFlow</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="w-6 h-6" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                  <Link href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                  <Link href="signin" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={()=> localStorage.removeItem('token')}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}