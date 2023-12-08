import { useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { getMovies } from 'api/movies.js';
import ErrorBackEnd from 'components/ErrorBackEnd/ErrorBackEnd';
import Loader from 'components/Loader/Loader';
import css from './MovieDetailsPage.module.css';

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
  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
  return (
    <>
      {errorBackEnd && <ErrorBackEnd errorBackEnd={errorBackEnd} />}
      {isLoader && <Loader />}
      {!errorBackEnd && !isLoader && (
        <div className={css.details}>
          <button className={css.detailsBtn} onClick={handleClick}>
            go to back
          </button>
          <div className={css.detailsBox}>
            <img
              className={css.detailsBoxImg}
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                  : defaultImg
              }
              width={200}
              alt={movieDetails.title}
            />
            <div className={css.detailsBoxInfo}>
              <h1 className={css.detailsBoxTitle}>
                {movieDetails.title}
                {`(${releaseYear})`}
              </h1>
              <p className={css.detailsBoxParagraph}>
                User Score: {Math.round(movieDetails.vote_average * 10)}%
              </p>
              <h2 className={css.detailsBoxSubTitle}>Overview</h2>
              <p className={css.detailsBoxParagraph}>{movieDetails.overview}</p>
              <h3 className={css.detailsBoxSubTitle}>Genres</h3>
              <p className={css.detailsBoxParagraph}>{genres.join(' ')}</p>
            </div>
          </div>
          <h4 className={css.detailsSubTitle}>Additional information</h4>
          <div className={css.detailsNavLink}>
            <NavLink className={css.detailsLink} to={`cast`}>
              Cast
            </NavLink>
            <NavLink className={css.detailsLink} to={`reviews`}>
              Reviews
            </NavLink>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
