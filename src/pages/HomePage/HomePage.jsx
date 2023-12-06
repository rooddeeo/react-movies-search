import { useEffect, useState } from 'react';
import { getMovies } from '../../api/movies.js';
import MoviesList from 'components/MoviesList/MoviesList.jsx';
// Home:

// кнопка Go Back
// постер, Reviews (при нажатии заменяются данные Cast на Reviews)

// Movies:
// инпут с поиском по ключевому слову при нажатии на сабмит получаем список

const HomePage = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const handleMovies = async () => {
      try {
        const data = await getMovies('trending/all/day');
        setGallery(prev => [...prev, ...data.results]);
      } catch (error) {}
    };
    handleMovies();
  }, []);

  return <MoviesList gallery={gallery} />;
};

export default HomePage;
