import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchForm = ({onSearch}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('')
  
  const handleChange = ({ target: { value } }) => {
    setQuery(value)
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSearchParams({search: query});
    onSearch({ query: searchParams.get('search')});
  };

  useEffect(() => {
  if(!query)
  setSearchParams({})
  }, [query, setSearchParams])
  
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          name="name"
          value={query}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
