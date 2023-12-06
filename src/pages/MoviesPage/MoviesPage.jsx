import { getSearchMovies } from 'api/movies';
import SearchForm from 'components/SearchForm/SearchForm';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [keywordResult, setKeywordResult] = useState([]);

  useEffect(() => {
    const handleMovies = async () => {
      try {
        if (query) {
          const data = await getSearchMovies(query);
          setKeywordResult(data.results);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    handleMovies();
  }, [query]);

  const handleSearch = ({ query }) => {
    setQuery(query);
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      {keywordResult.map(item => (
        <li key={item.id}>
          <Link to={`/movies/${item.id.toString()}`}>
            <p>{item.title || item.name}</p>
          </Link>
        </li>
      ))}
    </>
  );
};

export default MoviesPage;
