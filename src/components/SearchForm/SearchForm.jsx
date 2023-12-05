import { useSearchParams } from "react-router-dom";

const SearchForm = ({onSearch}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleSubmit = value => {
    value.preventDefault();
    console.log(searchParams.get('search'));
    onSearch({ query: searchParams.get('search')});
  };

  const handleChange = ({ target: { value } }) => {
    setSearchParams({search: value});
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          name="name"
          value={searchParams.get('search')}
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
