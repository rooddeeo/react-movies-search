import { getMovies } from 'api/movies';
import ErrorBackEnd from 'components/ErrorBackEnd/ErrorBackEnd';
import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './CastPage.module.css';

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
        <li className={css.castListItem} key={actor.id}>
          <>
            <img
              className={css.castItemImg}
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : defaultImg
              }
              width={150}
              alt={actor.name}
            />
            <div className={css.castItemParagraph}>
              <p className={css.castParagraphActor}>{actor.name}</p>
              <p>{actor.character}</p>
            </div>
          </>
        </li>
      ))
    : [];

  return (
    <>
      {errorBackEnd && <ErrorBackEnd errorBackEnd={errorBackEnd} />}
      {isLoader && <Loader />}
      {!errorBackEnd && !isLoader && (
        <div className={css.castBox}>
          <ul className={css.castCardList}>{actors}</ul>
        </div>
      )}
    </>
  );
};

export default CastPage;
