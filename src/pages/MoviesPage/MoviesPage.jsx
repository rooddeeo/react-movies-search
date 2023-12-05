import {getSearchMovies} from 'api/movies';
import SearchForm from 'components/SearchForm/SearchForm';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {

const [query, setQuery] = useState('')
const [keywordResult, setKeywordResult] = useState([])
const [searchParams] = useSearchParams()
useEffect(() => {
  const handleMovies = async () => {
    try {
      if (query) {
        const data = await getSearchMovies(query);
        setKeywordResult(data.results)
       console.log(data.results);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  handleMovies();
}, [query]);

useEffect(() => {
  const value = searchParams.get('search')
  if(value)
  setQuery(value)
}, [searchParams])


const handleSearch = ({ query }) => {
  setQuery(query);

};
  const listKeywordResult = keywordResult.map(item => (
  <li key={item.id}>
<Link to={`/movies/${item.id}`}>
<p>{item.title || item.name}</p>
</Link>
  </li>))
  return (
<>
<SearchForm onSearch={handleSearch} />
    {listKeywordResult}
    </>
  )
}

export default MoviesPage