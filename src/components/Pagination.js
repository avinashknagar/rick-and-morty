import React from 'react';

const Pagination = ({ 
  currentPage, 
  hasNextPage, 
  hasPrevPage, 
  totalPages, 
  onNextPage, 
  onPrevPage 
}) => {
  return (
    <div className="pagination">
      <button 
        className="pagination-button"
        onClick={onPrevPage} 
        disabled={!hasPrevPage}
      >
        <span>Previous</span>
      </button>
      <span className="pagination-info">Page {currentPage} of {totalPages}</span>
      <button 
        className="pagination-button"
        onClick={onNextPage} 
        disabled={!hasNextPage}
      >
        <span>Next</span>
      </button>
    </div>
  );
};

export default Pagination;
