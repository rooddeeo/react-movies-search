import {getMovies} from 'api/movies';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const MoviesList = () => {
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    const handleMovies = async () => {
      try {
        const data = await getMovies('trending/all/day');
        setGallery(prev => [...prev, ...data.results])
        console.log( data.results);
      } catch (error) {
      }
    }
    handleMovies()
  }, [])
const newGallery = gallery.map(card => (
    <li key={card.id}>
      <Link to={`/movies/${card.id}`}>
        <p>{card.title || card.name}</p>
      <img src={card.poster_path} alt={card.title} />
      <p>Language: {card.original_language} </p>
      <p>Popularity: {card.popularity} </p>
      <p>Release: {card.release_date} </p>
      <p>Average: {card.vote_average} </p>
      </Link>
    </li>

))
return newGallery
}

export default MoviesList