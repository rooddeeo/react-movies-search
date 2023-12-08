import { getSearchMovies } from 'api/movies';
import ErrorBackEnd from 'components/ErrorBackEnd/ErrorBackEnd';
import Loader from 'components/Loader/Loader';
import SearchForm from 'components/SearchForm/SearchForm';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  // const [query, setQuery] = useState('');
  const [keywordResult, setKeywordResult] = useState([]);
  const location = useLocation();
  const [errorBackEnd, setErrorBackEnd] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = searchParams.get('search');
    console.log(params);
    const handleMovies = async () => {
      try {
        setIsLoader(true);
        if (params) {
          const data = await getSearchMovies(params);
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
  }, [searchParams]);

  return (
    <>
      {errorBackEnd && <ErrorBackEnd errorBackEnd={errorBackEnd} />}
      {isLoader && <Loader />}
      {!errorBackEnd && !isLoader && (
        <>
          <SearchForm />
          <ul className={css.list}>
            {keywordResult.map(item => (
              <li className={css.listItem} key={item.id}>
                <Link
                  to={`/movies/${item.id.toString()}`}
                  state={{ from: location }}
                >
                  <p className={css.listItemParagraph}>
                    {item.title || item.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default MoviesPage;
