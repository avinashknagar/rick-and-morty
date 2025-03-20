import React, { useState, useEffect, useCallback } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  
  // Debounce search effect
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      onSearch(searchTerm);
    }, 500),
    [onSearch]
  );
  
  useEffect(() => {
    debouncedSearch(query);
    
    // Cleanup function for debounce
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Debounce function implementation
  function debounce(func, wait) {
    let timeout;
    
    const debounced = function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
    
    debounced.cancel = function() {
      clearTimeout(timeout);
    };
    
    return debounced;
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search characters by name..."
        className="search-input"
        style={{ width: '250px' }}
      />
    </div>
  );
};

export default SearchBar;
