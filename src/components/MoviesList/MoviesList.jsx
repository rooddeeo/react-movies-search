import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MoviesList = ({ gallery }) => {
  const location = useLocation();

  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  const newGallery = gallery.map(card => (
    <li key={card.id}>
      <Link to={`/movies/${card.id.toString()}`} state={{ from: location }}>
        <p>{card.title || card.name}</p>
        <img
          src={
            card.poster_path
              ? `https://image.tmdb.org/t/p/w500/${card.poster_path}`
              : defaultImg
          }
          width={250}
          alt={card.title}
        />
        <p>Language: {card.original_language} </p>
        <p>Popularity: {card.popularity} </p>
        <p>Release: {card.release_date} </p>
        <p>Average: {card.vote_average} </p>
      </Link>
    </li>
  ));

  return newGallery;
};

export default MoviesList;
