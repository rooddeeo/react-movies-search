
//ендпоинты:
//   /trending/get-trending список самых популярных фильмов на сегодня для создания коллекции на главной странице.
//   /search/search-movies поиск кинофильма по ключевому слову на странице фильмов.
//   /movies/get-movie-details запрос полной информации о фильме для страницы кинофильма.
//   /movies/get-movie-credits запрос информации о актёрском составе для страницы кинофильма.
//   /movies/get-movie-reviews запрос обзоров для страницы кинофильма.
import axios from "axios";
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API = 'api_key=7d82ceb0ab1c027a8051fbbd2993d1d0'
export const getMovies = async (props) => {
  const { data } = await axios(`${props}?${API}`);
  return data;
};

export const getSearchMovies = async (query) => {
  const { data } = await axios(`search/movie?query=${query}&${API}`);
  return data;
};