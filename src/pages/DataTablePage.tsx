import React, { useState } from 'react';
import DataTable from '../components/DataTable';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  department: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

// Sample data
const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15', department: 'IT' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14', department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'inactive', lastLogin: '2024-01-10', department: 'Sales' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2024-01-13', department: 'HR' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Developer', status: 'active', lastLogin: '2024-01-12', department: 'IT' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Manager', status: 'active', lastLogin: '2024-01-11', department: 'Marketing' },
  { id: 7, name: 'Eve Wilson', email: 'eve@example.com', role: 'User', status: 'inactive', lastLogin: '2024-01-09', department: 'Sales' },
  { id: 8, name: 'Frank Miller', email: 'frank@example.com', role: 'Developer', status: 'active', lastLogin: '2024-01-08', department: 'IT' },
];

const sampleProducts: Product[] = [
  { id: 'P001', name: 'Laptop', category: 'Electronics', price: 999.99, stock: 25, rating: 4.5 },
  { id: 'P002', name: 'Mouse', category: 'Electronics', price: 29.99, stock: 100, rating: 4.2 },
  { id: 'P003', name: 'Keyboard', category: 'Electronics', price: 79.99, stock: 50, rating: 4.3 },
  { id: 'P004', name: 'Monitor', category: 'Electronics', price: 299.99, stock: 15, rating: 4.7 },
  { id: 'P005', name: 'Headphones', category: 'Electronics', price: 149.99, stock: 30, rating: 4.1 },
  { id: 'P006', name: 'Tablet', category: 'Electronics', price: 399.99, stock: 20, rating: 4.6 },
  { id: 'P007', name: 'Smartphone', category: 'Electronics', price: 699.99, stock: 35, rating: 4.4 },
  { id: 'P008', name: 'Camera', category: 'Electronics', price: 499.99, stock: 12, rating: 4.8 },
];

// Column definitions
const userColumns = [
  { key: 'id' as keyof User, header: 'ID', sortable: true, width: 'w-16' },
  { key: 'name' as keyof User, header: 'Name', sortable: true },
  { key: 'email' as keyof User, header: 'Email', sortable: true },
  { key: 'role' as keyof User, header: 'Role', sortable: true },
  { 
    key: 'status' as keyof User, 
    header: 'Status', 
    sortable: true,
    render: (value: any, row: User) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        String(value) === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {String(value)}
      </span>
    )
  },
  { key: 'lastLogin' as keyof User, header: 'Last Login', sortable: true },
  { key: 'department' as keyof User, header: 'Department', sortable: true },
];

const productColumns = [
  { key: 'id' as keyof Product, header: 'Product ID', sortable: true, width: 'w-24' },
  { key: 'name' as keyof Product, header: 'Product Name', sortable: true },
  { key: 'category' as keyof Product, header: 'Category', sortable: true },
  { 
    key: 'price' as keyof Product, 
    header: 'Price', 
    sortable: true,
    render: (value: any, row: Product) => `$${Number(value).toFixed(2)}`
  },
  { key: 'stock' as keyof Product, header: 'Stock', sortable: true },
  { 
    key: 'rating' as keyof Product, 
    header: 'Rating', 
    sortable: true,
    render: (value: any, row: Product) => (
      <div className="flex items-center">
        <span className="text-yellow-400">★</span>
        <span className="ml-1">{Number(value)}</span>
      </div>
    )
  },
];

function DataTablePage() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'products'>('users');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [selectionMode, setSelectionMode] = useState<'multiple' | 'single'>('multiple');

  const handleUserSelect = (selectedRows: User[]) => {
    setSelectedUsers(selectedRows);
  };

  const handleProductSelect = (selectedRows: Product[]) => {
    setSelectedProducts(selectedRows);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleClearData = () => {
    setShowEmptyState(true);
  };

  const handleRestoreData = () => {
    setShowEmptyState(false);
  };

  // Type-safe data getters
  const getUsersData = () => showEmptyState ? [] : sampleUsers;
  const getProductsData = () => showEmptyState ? [] : sampleProducts;
  const getUsersColumns = () => userColumns;
  const getProductsColumns = () => productColumns;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Management Dashboard</h1>
          <p className="text-gray-600">Manage and view your data with powerful sorting and selection capabilities</p>
        </div>

        {/* Feature Controls */}
        <div className="mb-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Controls</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selection Mode</label>
              <select
                value={selectionMode}
                onChange={(e) => setSelectionMode(e.target.value as 'multiple' | 'single')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="multiple">Multiple Selection</option>
                <option value="single">Single Selection</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loading State</label>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Loading...' : 'Simulate Loading'}
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Empty State</label>
              <button
                onClick={showEmptyState ? handleRestoreData : handleClearData}
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                {showEmptyState ? 'Restore Data' : 'Show Empty State'}
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Data</label>
              <div className="px-3 py-2 bg-gray-100 rounded-md text-sm">
                {activeTab === 'users' ? getUsersData().length : getProductsData().length} {activeTab === 'users' ? 'Users' : 'Products'}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users ({sampleUsers.length})
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Products ({sampleProducts.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Users DataTable */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Add User
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Export
                  </button>
                </div>
              </div>

              <DataTable<User>
                data={getUsersData()}
                columns={getUsersColumns()}
                selectable={selectionMode}
                onRowSelect={handleUserSelect}
                loading={isLoading}
                emptyMessage="No users found. Please add some users to get started."
              />

              {/* Selection Summary */}
              {selectedUsers.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Selected Users ({selectedUsers.length}):
                  </h3>
                  <div className="text-sm text-blue-800">
                    {selectedUsers.map((user) => (
                      <div key={user.id}>• {user.name} - {user.role} ({user.email})</div>
                    ))}
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Edit Selected
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                      Delete Selected
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Products DataTable */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Add Product
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Export
                  </button>
                </div>
              </div>

              <DataTable<Product>
                data={getProductsData()}
                columns={getProductsColumns()}
                selectable={selectionMode}
                onRowSelect={handleProductSelect}
                loading={isLoading}
                emptyMessage="No products found. Please add some products to get started."
              />

              {/* Selection Summary */}
              {selectedProducts.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Selected Products ({selectedProducts.length}):
                  </h3>
                  <div className="text-sm text-blue-800">
                    {selectedProducts.map((product) => (
                      <div key={product.id}>• {product.name} - ${product.price} ({product.category})</div>
                    ))}
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Edit Selected
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                      Delete Selected
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Feature Explanation */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Row Selection</p>
                <p className="text-2xl font-semibold text-gray-900">{selectionMode}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectionMode === 'multiple' ? 'Checkbox selection' : 'Radio button selection'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Loading State</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {isLoading ? 'Active' : 'Ready'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isLoading ? 'Skeleton animation' : 'Data loaded'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Empty State</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {showEmptyState ? 'Empty' : 'Has Data'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {showEmptyState ? 'No data available' : 'Data present'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{sampleUsers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900">{sampleProducts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {sampleUsers.filter(user => user.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTablePage;
