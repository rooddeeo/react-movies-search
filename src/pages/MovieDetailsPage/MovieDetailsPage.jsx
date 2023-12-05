import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import {getMovies} from 'api/movies.js';

const MovieDetailsPage = () => {
 const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();

useEffect(() => {

if (!movieId) {return}
else {
  const handleMovies = async () => {
    try {
      const data = await getMovies(`movie/${movieId}`);
     setMovieDetails(data)
    } catch (error) {
    }
  }
  handleMovies()
}
}, [movieId]);
const releaseYear = movieDetails.release_date ? movieDetails.release_date.split('-')[0] : '';
const genres = movieDetails.genres ? movieDetails.genres.map(genre => genre.name) : [];

return (
  <>
    <button>go to back</button>
<h1>{movieDetails.title}{`(${releaseYear})`}</h1>
<p>User Score: {Math.round(movieDetails.vote_average*10)}%</p>
<h2>Overview</h2>
<p>{movieDetails.overview}</p>
<h3>Genres</h3>
<p>{genres.join(' ')}</p>
<p>Additional information</p>
    <Link to={`cast/${movieId}`}>Cast</Link>
    <Link to={`reviews/${movieId}`}>Reviews</Link>
    <Outlet/>
  </>
  )
}

export default MovieDetailsPage
// постер
// которой есть ссылки на Cast (при нажатии дополняется с низу состав актеров) и Reviews (при нажатии заменяются
// данные Cast на Reviews)