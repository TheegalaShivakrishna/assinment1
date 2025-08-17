import React from 'react';

interface NavigationProps {
  currentPage: 'input' | 'datatable';
  onPageChange: (page: 'input' | 'datatable') => void;
}

function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Component Library</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onPageChange('input')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'input'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              InputField Component
            </button>
            <button
              onClick={() => onPageChange('datatable')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'datatable'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              DataTable Component
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
