import { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { getMovies } from 'api/movies.js';
import ErrorBackEnd from 'components/ErrorBackEnd/ErrorBackEnd';
import Loader from 'components/Loader/Loader';

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [errorBackEnd, setErrorBackEnd] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    } else {
      const handleMovies = async () => {
        try {
          setIsLoader(true);
          const data = await getMovies(`movie/${movieId}`);
          setMovieDetails(data);
          setIsLoader(false);
        } catch (error) {
          setErrorBackEnd(error.message);
        } finally {
          setIsLoader(false);
        }
      };
      handleMovies();
    }
  }, [movieId]);
  const releaseYear = movieDetails.release_date
    ? movieDetails.release_date.split('-')[0]
    : '';
  const genres = movieDetails.genres
    ? movieDetails.genres.map(genre => genre.name)
    : [];
  const handleClick = () => {
    navigate(location.state?.from || '/');
  };

  return (
    <>
      {errorBackEnd && <ErrorBackEnd errorBackEnd={errorBackEnd} />}
      {isLoader && <Loader />}
      {!errorBackEnd && !isLoader && (
        <>
          <button onClick={handleClick}>go to back</button>
          <h1>
            {movieDetails.title}
            {`(${releaseYear})`}
          </h1>
          <p>User Score: {Math.round(movieDetails.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>
          <p>{genres.join(' ')}</p>
          <p>Additional information</p>
          <Link to={`cast/${movieId}`}>Cast</Link>
          <Link to={`reviews/${movieId}`}>Reviews</Link>
          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
