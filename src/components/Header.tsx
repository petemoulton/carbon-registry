import React from 'react';
import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-green-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Carbon Registry Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}