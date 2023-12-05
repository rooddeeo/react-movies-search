import HomePage from 'pages/HomePage/HomePage';
import CastPage from 'pages/CastPage/CastPage';
import ReviewsPage from 'pages/ReviewsPage/ReviewsPage';
import MovieDetailsPage from 'pages/MovieDetailsPage/MovieDetailsPage.jsx';
import MoviesPage from 'pages/MoviesPage/MoviesPage.jsx';
import { Route, Routes } from 'react-router-dom';
import Layout from 'Layout/Layout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast/:id" element={<CastPage />} />
          <Route path="reviews/:id" element={<ReviewsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
