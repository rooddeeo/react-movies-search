import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import css from './SearchForm.module.css';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [inputUp, setInputUp] = useState(false);

  const handleChange = ({ target: { value } }) => {
    if (!value) setSearchParams({});
    setQuery(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!query) return setSearchParams({});
    setSearchParams({ search: query });
    setInputUp(true);
  };

  useEffect(() => {
    const value = searchParams.get('search');
    if (value) setQuery(value);
  }, [searchParams]);

  return (
    <form onSubmit={handleSubmit}>
      <div className={`${css.formBox} ${inputUp ? css.inputUp : ''}`}>
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
