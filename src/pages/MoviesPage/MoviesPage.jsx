import { getSearchMovies } from 'api/movies';
import ErrorBackEnd from 'components/ErrorBackEnd/ErrorBackEnd';
import Loader from 'components/Loader/Loader';
import SearchForm from 'components/SearchForm/SearchForm';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [keywordResult, setKeywordResult] = useState([]);
  const location = useLocation();
  const [errorBackEnd, setErrorBackEnd] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const handleMovies = async () => {
      try {
        setIsLoader(true);
        if (query) {
          const data = await getSearchMovies(query);
          setKeywordResult(data.results);
          setIsLoader(false);
        }
      } catch (error) {
        setErrorBackEnd(error.message);
      } finally {
        setIsLoader(false);
      }
    };

    handleMovies();
  }, [query]);

  const handleSearch = ({ query }) => {
    setQuery(query);
  };

  return (
    <>
      {errorBackEnd && <ErrorBackEnd errorBackEnd={errorBackEnd} />}
      {isLoader && <Loader />}
      {!errorBackEnd && !isLoader && (
        <>
          <SearchForm onSearch={handleSearch} />
          {keywordResult.map(item => (
            <li key={item.id}>
              <Link
                to={`/movies/${item.id.toString()}`}
                state={{ from: location }}
              >
                <p>{item.title || item.name}</p>
              </Link>
            </li>
          ))}
        </>
      )}
    </>
  );
};

export default MoviesPage;
