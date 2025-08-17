import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import DataTable from './DataTable';

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

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible data table component with sorting, row selection, loading states, and empty states.',
      },
    },
  },
  argTypes: {
    loading: {
      control: { type: 'boolean' },
      description: 'Whether to show loading state',
    },
    selectable: {
      control: { type: 'select' },
      options: [false, 'single', 'multiple'],
      description: 'Row selection type',
    },
    emptyMessage: {
      control: { type: 'text' },
      description: 'Custom message for empty state',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15', department: 'IT' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14', department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'inactive', lastLogin: '2024-01-10', department: 'Sales' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', lastLogin: '2024-01-13', department: 'HR' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Developer', status: 'active', lastLogin: '2024-01-12', department: 'IT' },
];

const sampleProducts: Product[] = [
  { id: 'P001', name: 'Laptop', category: 'Electronics', price: 999.99, stock: 25, rating: 4.5 },
  { id: 'P002', name: 'Mouse', category: 'Electronics', price: 29.99, stock: 100, rating: 4.2 },
  { id: 'P003', name: 'Keyboard', category: 'Electronics', price: 79.99, stock: 50, rating: 4.3 },
  { id: 'P004', name: 'Monitor', category: 'Electronics', price: 299.99, stock: 15, rating: 4.7 },
  { id: 'P005', name: 'Headphones', category: 'Electronics', price: 149.99, stock: 30, rating: 4.1 },
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
    render: (value: string | number, row: User) => (
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
    render: (value: string | number, row: Product) => `$${Number(value).toFixed(2)}`
  },
  { key: 'stock' as keyof Product, header: 'Stock', sortable: true },
  { 
    key: 'rating' as keyof Product, 
    header: 'Rating', 
    sortable: true,
    render: (value: string | number, row: Product) => (
      <div className="flex items-center">
        <span className="text-yellow-400">★</span>
        <span className="ml-1">{Number(value)}</span>
      </div>
    )
  },
];

// Basic DataTable
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
};

// With Single Row Selection
export const SingleSelection: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: 'single',
  },
};

// With Multiple Row Selection
export const MultipleSelection: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: 'multiple',
  },
};

// Products Table
export const ProductsTable: Story = {
  args: {
    data: sampleProducts,
    columns: productColumns,
    selectable: 'multiple',
  },
};

// Loading State
export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
  },
};

// Empty State
export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: 'No users found. Please add some users to get started.',
  },
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [users, setUsers] = useState<User[]>(sampleUsers);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const handleRowSelect = (selectedRows: User[]) => {
      setSelectedUsers(selectedRows);
      console.log('Selected users:', selectedRows);
    };

    const handleRefresh = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUsers([...sampleUsers].sort(() => Math.random() - 0.5));
      setLoading(false);
    };

    const handleDeleteSelected = () => {
      if (selectedUsers.length > 0) {
        const remainingUsers = users.filter(user => 
          !selectedUsers.some(selected => selected.id === user.id)
        );
        setUsers(remainingUsers);
        setSelectedUsers([]);
      }
    };

    return (
      <div className="w-full max-w-6xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">User Management</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            {selectedUsers.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Selected ({selectedUsers.length})
              </button>
            )}
          </div>
        </div>

        <DataTable
          data={users}
          columns={userColumns}
          selectable="multiple"
          onRowSelect={handleRowSelect}
          loading={loading}
        />

        {selectedUsers.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Selected Users:</h3>
            <div className="text-sm text-blue-800">
              {selectedUsers.map(user => (
                <div key={user.id}>• {user.name} ({user.email})</div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: 'multiple',
    className: 'border-2 border-purple-300',
  },
};

// Large Dataset
export const LargeDataset: Story = {
  render: () => {
    const largeDataset = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Manager' : 'User',
      status: (i % 4 === 0 ? 'inactive' : 'active') as 'active' | 'inactive',
      lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      department: ['IT', 'Marketing', 'Sales', 'HR'][i % 4],
    }));

    return (
      <div className="w-full max-w-6xl">
        <h2 className="text-xl font-semibold mb-4">Large Dataset (100 rows)</h2>
        <DataTable
          data={largeDataset}
          columns={userColumns}
          selectable="multiple"
        />
      </div>
    );
  },
};
