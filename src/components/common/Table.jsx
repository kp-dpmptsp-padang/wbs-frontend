import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import { FiChevronUp, FiChevronDown, FiSearch, FiFilter, FiX, FiCheck } from 'react-icons/fi';

// Table wrapper component
const Table = ({
  columns = [],
  data = [],
  keyField = 'id',
  loading = false,
  pagination = false,
  pageSize = 10,
  totalItems = null,
  currentPage = 1,
  onPageChange = null,
  sortable = false,
  striped = false,
  hoverable = true,
  bordered = true,
  size = 'md',
  variant = 'default',
  responsive = true,
  className = '',
  wrapperClassName = '',
  emptyMessage = 'No data available',
  selectable = false,
  onRowSelect = null,
  selectedRows = [],
  onSort = null,
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearch = null,
  filterComponent = null,
  actions = null,
  loadingComponent = null,
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  ...rest
}) => {
  // State for internal sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'none'
  });

  // State for internal pagination if not controlled externally
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  
  // State for internal search if not controlled externally
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for internal row selection if not controlled externally
  const [internalSelectedRows, setInternalSelectedRows] = useState([]);
  
  // Use external or internal pagination
  const activePage = onPageChange ? currentPage : internalCurrentPage;
  
  // Use external or internal row selection
  const activeSelectedRows = onRowSelect ? selectedRows : internalSelectedRows;
  
  // Handle row selection
  const handleRowSelect = useCallback((rowKey, checked) => {
    const newSelectedRows = checked
      ? [...activeSelectedRows, rowKey]
      : activeSelectedRows.filter(key => key !== rowKey);
    
    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    } else {
      setInternalSelectedRows(newSelectedRows);
    }
  }, [activeSelectedRows, onRowSelect]);
  
  // Handle "select all" functionality
  const handleSelectAll = useCallback((checked) => {
    const newSelectedRows = checked
      ? data.map(row => row[keyField])
      : [];
    
    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    } else {
      setInternalSelectedRows(newSelectedRows);
    }
  }, [data, keyField, onRowSelect]);
  
  // Check if all rows are selected
  const allRowsSelected = useMemo(() => {
    return data.length > 0 && data.every(row => 
      activeSelectedRows.includes(row[keyField])
    );
  }, [data, activeSelectedRows, keyField]);
  
  // Check if some rows are selected (but not all)
  const someRowsSelected = useMemo(() => {
    return activeSelectedRows.length > 0 && !allRowsSelected;
  }, [activeSelectedRows, allRowsSelected]);
  
  // Handle sort request
  const handleSort = useCallback((key) => {
    let direction = 'asc';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = 'none';
      }
    }
    
    const newSortConfig = { 
      key: direction === 'none' ? null : key, 
      direction: direction 
    };
    
    setSortConfig(newSortConfig);
    
    if (onSort) {
      onSort(newSortConfig);
    }
  }, [sortConfig, onSort]);
  
  // Handle search
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (onSearch) {
      onSearch(value);
    }
  }, [onSearch]);
  
  // Handle page change
  const handlePageChange = useCallback((page) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setInternalCurrentPage(page);
    }
  }, [onPageChange]);
  
  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  }, [onSearch]);

  // Process data for sorting and filtering if needed
  const processedData = useMemo(() => {
    // Only sort locally if external sorting is not provided (onSort is null)
    if (!onSort && sortConfig.key && sortConfig.direction !== 'none') {
      return [...data].sort((a, b) => {
        // Get values to compare
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Handle custom accessor function
        const column = columns.find(col => col.key === sortConfig.key);
        if (column && column.accessor) {
          aValue = column.accessor(a);
          bValue = column.accessor(b);
        }
        
        // Handle undefined or null values
        if (aValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue == null) return sortConfig.direction === 'asc' ? 1 : -1;
        
        // Compare based on data type
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        // Numeric comparison
        return sortConfig.direction === 'asc' 
          ? aValue - bValue 
          : bValue - aValue;
      });
    }
    
    // Only filter locally if external search is not provided (onSearch is null)
    if (!onSearch && searchTerm) {
      return data.filter(row => {
        // Search through all displayed columns
        return columns.some(column => {
          // Skip if column is not searchable
          if (column.searchable === false) return false;
          
          // Get value to search
          let value = row[column.key];
          
          // Handle custom accessor function
          if (column.accessor) {
            value = column.accessor(row);
          }
          
          // Convert to string and check for match
          if (value != null) {
            return String(value)
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          }
          
          return false;
        });
      });
    }
    
    return data;
  }, [data, columns, sortConfig, onSort, searchTerm, onSearch]);
  
  // Get paginated data
  const paginatedData = useMemo(() => {
    // Only paginate locally if external pagination is not provided
    if (!onPageChange && pagination) {
      const start = (activePage - 1) * pageSize;
      const end = start + pageSize;
      return processedData.slice(start, end);
    }
    
    return processedData;
  }, [processedData, pagination, activePage, pageSize, onPageChange]);
  
  // Calculate total pages for internal pagination
  const totalPages = useMemo(() => {
    const total = totalItems || processedData.length;
    return Math.ceil(total / pageSize);
  }, [totalItems, processedData.length, pageSize]);
  
  // Size classes for various table elements
  const sizeClasses = {
    sm: {
      table: '',
      th: 'px-3 py-2 text-xs',
      td: 'px-3 py-2 text-xs',
      input: 'text-xs py-1 px-2',
      button: 'text-xs py-1 px-2'
    },
    md: {
      table: '',
      th: 'px-6 py-3 text-xs',
      td: 'px-6 py-4 text-sm',
      input: 'text-sm py-2 px-3',
      button: 'text-sm py-2 px-3'
    },
    lg: {
      table: '',
      th: 'px-8 py-4 text-sm',
      td: 'px-8 py-5 text-base',
      input: 'text-base py-2.5 px-4',
      button: 'text-base py-2.5 px-4'
    }
  };
  
  // Variant classes
  const variantClasses = {
    'default': 'divide-y divide-gray-200',
    'primary': 'divide-y divide-primary/20',
    'bordered': 'border-collapse border border-gray-200',
    'striped': ''
  };
  
  // Build table class names
  const tableClasses = [
    'min-w-full',
    variantClasses[variant] || variantClasses.default,
    className
  ].filter(Boolean).join(' ');
  
  // Build header classes
  const theadClasses = [
    variant === 'striped' ? 'bg-gray-50' : '',
    variant === 'primary' ? 'bg-primary/5' : ''
  ].filter(Boolean).join(' ');
  
  // Build wrapper classes
  const finalWrapperClassName = [
    'border border-gray-200 rounded-lg overflow-hidden',
    bordered ? '' : 'border-0',
    wrapperClassName
  ].filter(Boolean).join(' ');
  
  // Build responsive wrapper classes
  const responsiveWrapperClasses = [
    responsive ? 'flex flex-col' : '',
    responsive ? '-m-1.5 overflow-x-auto' : ''
  ].filter(Boolean).join(' ');
  
  // Inner responsive wrapper classes
  const innerResponsiveWrapperClasses = [
    responsive ? 'p-1.5 min-w-full inline-block align-middle' : ''
  ].filter(Boolean).join(' ');

  // Render sorting indicator for sortable columns
  const renderSortIndicator = (column) => {
    if (!sortable || column.sortable === false) return null;
    
    const isSorted = sortConfig.key === column.key;
    const direction = isSorted ? sortConfig.direction : 'none';
    
    return (
      <span className="inline-flex">
        <span className={`
          ms-2 flex flex-col 
          ${direction === 'asc' ? 'text-primary' : 'text-gray-400'}
          ${direction === 'desc' ? 'text-primary' : 'text-gray-400'}
        `}>
          <FiChevronUp className={`size-3.5 ${direction === 'asc' ? 'text-primary' : 'text-gray-400'}`} />
          <FiChevronDown className={`size-3.5 mt-[-3px] ${direction === 'desc' ? 'text-primary' : 'text-gray-400'}`} />
        </span>
      </span>
    );
  };

  // Render the loading state
  const renderLoading = () => {
    if (!loading) return null;
    
    // If a custom loading component is provided, use it
    if (loadingComponent) return loadingComponent;
    
    // Otherwise, render a default loading state
    return (
      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  };

  // Render the table header with search and filter options
  const renderTableHeader = () => {
    // If no search or filter is needed, and no custom actions, return null
    if (!searchable && !filterComponent && !actions) return null;
    
    return (
      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
        <div>
          {/* Placeholder for left side header actions */}
          {actions && actions.left && (
            <div>{actions.left}</div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search input */}
          {searchable && (
            <div className="relative max-w-xs">
              <label className="sr-only">Search</label>
              <input
                type="text"
                className={`
                  py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm 
                  focus:z-10 focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none
                  ${sizeClasses[size].input}
                `}
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                <FiSearch className="size-4 text-gray-400" />
              </div>
              {searchTerm && (
                <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                  <button 
                    type="button"
                    className="size-4 text-gray-400 hover:text-gray-600" 
                    onClick={clearSearch}
                  >
                    <FiX className="size-4" />
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Filter component */}
          {filterComponent && (
            <div className="inline-flex">
              {filterComponent}
            </div>
          )}
          
          {/* Right side actions */}
          {actions && actions.right && (
            <div className="inline-flex gap-2">
              {actions.right}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Render the empty state
  const renderEmptyState = () => {
    if (paginatedData.length > 0) return null;
    
    return (
      <tr>
        <td 
          colSpan={selectable ? columns.length + 1 : columns.length}
          className={`${sizeClasses[size].td} text-center text-gray-500`}
        >
          {emptyMessage}
        </td>
      </tr>
    );
  };
  
  // Render the table footer with pagination
  const renderTableFooter = () => {
    if (!pagination) return null;
    
    return (
      <div className={`px-6 py-4 border-t border-gray-200 ${footerClassName}`}>
        <Pagination 
          currentPage={activePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    );
  };

  return (
    <div className={responsiveWrapperClasses}>
      <div className={innerResponsiveWrapperClasses}>
        <div className={finalWrapperClassName}>
          {/* Table Header with Search and Filters */}
          {renderTableHeader()}
          
          {/* Table Container */}
          <div className="relative">
            {/* Loading Overlay */}
            {renderLoading()}
            
            {/* Main Table */}
            <table className={tableClasses} {...rest}>
              {/* Table Head */}
              <thead className={`${theadClasses} ${headerClassName}`}>
                <tr>
                  {/* Checkbox Column */}
                  {selectable && (
                    <th className={sizeClasses[size].th}>
                      <div className="px-3 py-2 flex items-center">
                        <input
                          type="checkbox"
                          className="shrink-0 border-gray-200 rounded text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
                          checked={allRowsSelected}
                          ref={input => {
                            if (input) {
                              input.indeterminate = someRowsSelected && !allRowsSelected;
                            }
                          }}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          aria-label="Select all"
                        />
                      </div>
                    </th>
                  )}
                  
                  {/* Column Headers */}
                  {columns.map((column) => (
                    <th 
                      key={column.key} 
                      className={`
                        ${sizeClasses[size].th} 
                        ${column.align === 'right' ? 'text-end' : column.align === 'center' ? 'text-center' : 'text-start'}
                        font-medium text-gray-500 uppercase
                        ${sortable && column.sortable !== false ? 'cursor-pointer hover:bg-gray-50' : ''}
                        ${column.width ? `w-${column.width}` : ''}
                        ${column.className || ''}
                      `}
                      onClick={sortable && column.sortable !== false ? () => handleSort(column.key) : undefined}
                      style={column.style}
                    >
                      <div className="inline-flex items-center gap-1">
                        {column.title || column.key}
                        {renderSortIndicator(column)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className={`divide-y divide-gray-200 ${bodyClassName}`}>
                {/* Empty State */}
                {renderEmptyState()}
                
                {/* Table Rows */}
                {paginatedData.map((row, rowIndex) => (
                  <tr 
                    key={row[keyField] || rowIndex}
                    className={`
                      ${hoverable ? 'hover:bg-gray-50' : ''}
                      ${striped && rowIndex % 2 === 1 ? 'bg-gray-50' : ''}
                      ${activeSelectedRows.includes(row[keyField]) ? 'bg-primary/5' : ''}
                    `}
                  >
                    {/* Row Selection Checkbox */}
                    {selectable && (
                      <td className={sizeClasses[size].td}>
                        <div className="px-3 flex items-center">
                          <input
                            type="checkbox"
                            className="shrink-0 border-gray-200 rounded text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
                            checked={activeSelectedRows.includes(row[keyField])}
                            onChange={(e) => handleRowSelect(row[keyField], e.target.checked)}
                            aria-label={`Select row ${rowIndex + 1}`}
                          />
                        </div>
                      </td>
                    )}
                    
                    {/* Row Cells */}
                    {columns.map((column) => {
                      // Get cell value
                      let cellContent;
                      
                      if (column.render) {
                        // If custom render function is provided
                        cellContent = column.render(row, rowIndex);
                      } else if (column.accessor) {
                        // If accessor function is provided
                        cellContent = column.accessor(row);
                      } else {
                        // Default: use the column key to get the value
                        cellContent = row[column.key];
                      }
                      
                      return (
                        <td 
                          key={`${row[keyField]}-${column.key}`}
                          className={`
                            ${sizeClasses[size].td}
                            ${column.align === 'right' ? 'text-end' : column.align === 'center' ? 'text-center' : 'text-start'}
                            ${column.nowrap !== false ? 'whitespace-nowrap' : 'whitespace-normal'}
                            ${column.truncate ? 'truncate' : ''}
                            ${column.dataClassName || ''}
                            ${column.key === 'action' || column.key === 'actions' ? 'font-medium' : ''}
                          `}
                          style={{
                            maxWidth: column.maxWidth ? `${column.maxWidth}px` : undefined,
                            ...column.dataStyle
                          }}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer with Pagination */}
          {renderTableFooter()}
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.node,
      render: PropTypes.func,
      accessor: PropTypes.func,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      sortable: PropTypes.bool,
      searchable: PropTypes.bool,
      nowrap: PropTypes.bool,
      truncate: PropTypes.bool,
      maxWidth: PropTypes.number,
      className: PropTypes.string,
      dataClassName: PropTypes.string,
      style: PropTypes.object,
      dataStyle: PropTypes.object
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  keyField: PropTypes.string,
  loading: PropTypes.bool,
  pagination: PropTypes.bool,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  sortable: PropTypes.bool,
  striped: PropTypes.bool,
  hoverable: PropTypes.bool,
  bordered: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'primary', 'bordered', 'striped']),
  responsive: PropTypes.bool,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  emptyMessage: PropTypes.node,
  selectable: PropTypes.bool,
  onRowSelect: PropTypes.func,
  selectedRows: PropTypes.array,
  onSort: PropTypes.func,
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  onSearch: PropTypes.func,
  filterComponent: PropTypes.node,
  actions: PropTypes.shape({
    left: PropTypes.node,
    right: PropTypes.node
  }),
  loading: PropTypes.bool,
  loadingComponent: PropTypes.node,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string
};

export default Table;