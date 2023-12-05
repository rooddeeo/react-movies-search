import {getMovies} from 'api/movies';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CastPage = () => {
  const [actorsData, setActorsData] = useState({})
  const { movieId } = useParams();
  useEffect(() => {
const handleCast = async () => {
  try {
    const data = await getMovies(`movie/${movieId}/credits`)
    setActorsData(data)
  } catch (error) {
    
  }
}
handleCast()
  }, [])
  const actors = actorsData.cast ? actorsData.cast.map(actor => 
    <ul key={actor.id}>
      <li >
        {actor.name}
      </li>
      <li>
        {actor.character}
      </li>
    </ul>
    ) : []
    
  return (
    <>
    {actors}
    </>
  );
};

export default CastPage;
