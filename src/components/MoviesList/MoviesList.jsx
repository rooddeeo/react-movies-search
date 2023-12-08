import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './MoviesList.module.css';

const MoviesList = ({ gallery }) => {
  const location = useLocation();

  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  const newGallery = gallery.map(card => (
    <li className={css.listItem} key={card.id}>
      <Link to={`/movies/${card.id.toString()}`} state={{ from: location }}>
        <p className={css.listItemTitle}>{card.title || card.name}</p>
        <img
          className={css.listItemImg}
          src={
            card.poster_path
              ? `https://image.tmdb.org/t/p/w500/${card.poster_path}`
              : defaultImg
          }
          width={250}
          alt={card.title}
        />
        <div className={css.listItemBox}>
          <p className={css.listItemParagraph}>
            Lang: {card.original_language.toUpperCase()}
          </p>
          <p className={css.listItemParagraph}>Popul: {card.popularity} </p>
          <p className={css.listItemParagraph}>
            Year: {card.release_date ? card.release_date.split('-')[0] : ''}
          </p>
          <p className={css.listItemParagraph}>
            Average: {Math.round(card.vote_average * 10)}%
          </p>
        </div>
      </Link>
    </li>
  ));

  return <ul className={css.list}>{newGallery}</ul>;
};

export default MoviesList;
