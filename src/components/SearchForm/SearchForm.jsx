import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import css from './SearchForm.module.css';

const SearchForm = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const handleChange = ({ target: { value } }) => {
    if (!value) setSearchParams({});
    setQuery(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!query) return setSearchParams({});
    setSearchParams({ search: query });
    onSearch({ query: searchParams.get('search') });
  };

  useEffect(() => {
    const value = searchParams.get('search');
    if (value) setQuery(value);
  }, [searchParams]);

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.formBox}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          name="name"
          value={query}
          onChange={handleChange}
          placeholder="Search movies information"
        />
        <button className={css.btn} type="submit">
          <span>Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
