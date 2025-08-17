import React, { useState, useMemo } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: 'single' | 'multiple' | false;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
  className?: string;
  id?: string;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyMessage = 'No data available',
  className = '',
  id,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Sort data based on current sort configuration
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Handle column sorting
  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Handle row selection
  const handleRowSelect = (rowIndex: number, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    
    if (selectable === 'single') {
      newSelectedRows.clear();
      if (checked) {
        newSelectedRows.add(rowIndex);
      }
    } else if (selectable === 'multiple') {
      if (checked) {
        newSelectedRows.add(rowIndex);
      } else {
        newSelectedRows.delete(rowIndex);
      }
    }

    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selectedData = Array.from(newSelectedRows).map(index => sortedData[index]);
      onRowSelect(selectedData);
    }
  };

  // Handle select all rows
  const handleSelectAll = (checked: boolean) => {
    if (selectable === 'multiple') {
      if (checked) {
        const allIndices = new Set(sortedData.map((_, index) => index));
        setSelectedRows(allIndices);
        if (onRowSelect) {
          onRowSelect(sortedData);
        }
      } else {
        setSelectedRows(new Set());
        if (onRowSelect) {
          onRowSelect([]);
        }
      }
    }
  };

  // Get sort icon for column
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <ChevronUpIcon className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUpIcon className="h-4 w-4 text-primary-600" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 text-primary-600" />
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className={`w-full ${className}`} id={id}>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className={`w-full ${className}`} id={id}>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Data Table</h3>
          </div>
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
            <p className="text-gray-500">{emptyMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`} id={id}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Data Table</h3>
          {selectable && (
            <p className="text-sm text-gray-500 mt-1">
              {selectedRows.size} of {data.length} rows selected
            </p>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {/* Selection checkbox */}
                {selectable && (
                  <th className="px-6 py-3 text-left">
                    {selectable === 'multiple' && (
                      <input
                        type="checkbox"
                        checked={selectedRows.size === data.length && data.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    )}
                  </th>
                )}

                {/* Column headers */}
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.width ? column.width : ''
                    }`}
                  >
                    {column.sortable ? (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="flex items-center space-x-1 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                      >
                        <span>{column.header}</span>
                        {getSortIcon(column.key)}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`hover:bg-gray-50 ${
                    selectedRows.has(rowIndex) ? 'bg-primary-50' : ''
                  }`}
                >
                  {/* Selection checkbox */}
                  {selectable && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type={selectable === 'single' ? 'radio' : 'checkbox'}
                        name={selectable === 'single' ? 'row-select' : undefined}
                        checked={selectedRows.has(rowIndex)}
                        onChange={(e) => handleRowSelect(rowIndex, e.target.checked)}
                        className={`rounded ${
                          selectable === 'single'
                            ? 'border-gray-300 text-primary-600 focus:ring-primary-500'
                            : 'border-gray-300 text-primary-600 focus:ring-primary-500'
                        }`}
                      />
                    </td>
                  )}

                  {/* Row data */}
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render ? (
                        column.render(row[column.key], row)
                      ) : (
                        <span className={row[column.key] === null || row[column.key] === undefined ? 'text-gray-400' : ''}>
                          {row[column.key] === null || row[column.key] === undefined ? '—' : String(row[column.key])}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Showing {data.length} results</span>
            {sortConfig.key && (
              <span>
                Sorted by {String(sortConfig.key)} ({sortConfig.direction})
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
