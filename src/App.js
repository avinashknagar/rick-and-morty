import React, { useState, useEffect } from 'react';
import CharacterList from './components/CharacterList';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import { fetchCharacters } from './api';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchQuery, setLastSearchQuery] = useState('');

  useEffect(() => {
    const getCharacters = async () => {
      setIsLoading(true);
      try {
        // If the search query changes, we want to reset to page 1, otherwise keep current page
        const pageToFetch = searchQuery !== lastSearchQuery ? 1 : currentPage;
        
        // Update lastSearchQuery to track changes
        if (searchQuery !== lastSearchQuery) {
          setLastSearchQuery(searchQuery);
          setCurrentPage(1); // Only update currentPage when search changes
        }
        
        const data = await fetchCharacters(pageToFetch, searchQuery);
        setCharacters(data.results);
        setInfo(data.info);
        setError(null);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('No characters found matching your search. Try something else.');
          setCharacters([]);
          setInfo({});
        } else {
          setError('Failed to fetch characters. Please try again later.');
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getCharacters();
  }, [currentPage, searchQuery, lastSearchQuery]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // We'll let the useEffect handle resetting currentPage only when search query changes
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-title">
          <h1>Rick and Morty Character Explorer</h1>
          <p>Explore characters from the Rick and Morty universe</p>
        </div>
        <div className="header-search">
          <SearchBar onSearch={handleSearch} />
          {info.pages > 0 && (
            <Pagination 
              currentPage={currentPage}
              hasNextPage={info.next !== null}
              hasPrevPage={info.prev !== null}
              totalPages={info.pages}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
            />
          )}
        </div>
      </header>

      <div className="main-content">
        <div className="content-area">
          {isLoading ? (
            <div className="loading">Loading characters...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <CharacterList characters={characters} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
