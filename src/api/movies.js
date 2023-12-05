import axios from "axios";
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API = 'api_key=7d82ceb0ab1c027a8051fbbd2993d1d0'
export const getMovies = async (props) => {
  const { data } = await axios(`${props}?${API}`);
  console.log(data)
  return data;
};

export const getSearchMovies = async (query) => {
  const { data } = await axios(`search/movie?query=${query}&${API}`);
  return data;
};