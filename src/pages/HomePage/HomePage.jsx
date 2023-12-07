import { useEffect, useState } from 'react';
import { getMovies } from '../../api/movies.js';
import MoviesList from 'components/MoviesList/MoviesList.jsx';
import ErrorBackEnd from 'components/ErrorBackEnd/ErrorBackEnd.jsx';
import Loader from 'components/Loader/Loader.jsx';

const HomePage = () => {
  const [gallery, setGallery] = useState([]);
  const [errorBackEnd, setErrorBackEnd] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const handleMovies = async () => {
      try {
        setIsLoader(true);
        const data = await getMovies('trending/all/day');
        setGallery(prev => [...prev, ...data.results]);
        setIsLoader(false);
      } catch (error) {
        setErrorBackEnd(error.message);
      } finally {
        setIsLoader(false);
      }
    };
    handleMovies();
  }, []);

  return (
    <>
      {isLoader && <Loader />}
      {errorBackEnd && <ErrorBackEnd errorBackEnd={errorBackEnd} />}
      {!errorBackEnd && !isLoader && <MoviesList gallery={gallery} />}
    </>
  );
};

export default HomePage;
