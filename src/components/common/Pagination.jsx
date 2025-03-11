// src/components/common/Pagination.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers to display (current page, +/- 2 pages, first & last)
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always include first page
    pageNumbers.push(1);
    
    // Add current page and pages before and after
    for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }
    
    // Always include last page if there's more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    // Sort and ensure no duplicates
    return [...new Set(pageNumbers)].sort((a, b) => a - b);
  };
  
  const pageNumbers = getPageNumbers();
  
  // Add ellipsis between non-consecutive page numbers
  const paginationItems = [];
  
  for (let i = 0; i < pageNumbers.length; i++) {
    // Add current page number
    paginationItems.push({
      type: 'number',
      value: pageNumbers[i]
    });
    
    // Add ellipsis if there's a gap
    if (i < pageNumbers.length - 1 && pageNumbers[i + 1] - pageNumbers[i] > 1) {
      paginationItems.push({
        type: 'ellipsis',
        value: '...'
      });
    }
  }
  
  // Determine if prev/next buttons should be disabled
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  
  return (
    <nav className="flex justify-center">
      <ul className="flex items-center">
        {/* Previous page button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isPrevDisabled}
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
              isPrevDisabled 
                ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
            }`}
            aria-label="Previous"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
        </li>
        
        {/* Page numbers */}
        {paginationItems.map((item, index) => (
          <li key={`page-${index}`}>
            {item.type === 'ellipsis' ? (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(item.value)}
                className={`relative inline-flex items-center px-4 py-2 border ${
                  currentPage === item.value
                    ? 'z-10 border-primary bg-primary/10 text-primary font-medium'
                    : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                }`}
                aria-current={currentPage === item.value ? 'page' : undefined}
              >
                {item.value}
              </button>
            )}
          </li>
        ))}
        
        {/* Next page button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isNextDisabled}
            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
              isNextDisabled 
                ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
            }`}
            aria-label="Next"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;