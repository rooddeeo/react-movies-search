import { getMovies } from 'api/movies';
import ErrorBackEnd from 'components/ErrorBackEnd/ErrorBackEnd';
import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CastPage = () => {
  const [actorsData, setActorsData] = useState({});
  const { movieId } = useParams();
  const [errorBackEnd, setErrorBackEnd] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const handleCast = async () => {
      try {
        setIsLoader(true);
        const data = await getMovies(`movie/${movieId}/credits`);
        setActorsData(data);
        setIsLoader(false);
      } catch (error) {
        setErrorBackEnd(error.message);
      } finally {
        setIsLoader(false);
      }
    };
    handleCast();
  }, [movieId]);

  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  const actors = actorsData.cast
    ? actorsData.cast.map(actor => (
        <ul key={actor.id}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                : defaultImg
            }
            width={150}
            alt={actor.name}
          />
          <li>{actor.name}</li>
          <li>{actor.character}</li>
        </ul>
      ))
    : [];

  return (
    <>
      {errorBackEnd && <ErrorBackEnd errorBackEnd={errorBackEnd} />}
      {isLoader && <Loader />}
      {!errorBackEnd && !isLoader && actors}
    </>
  );
};

export default CastPage;
