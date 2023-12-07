// import HomePage from 'pages/HomePage/HomePage';
// import CastPage from 'pages/CastPage/CastPage';
// import ReviewsPage from 'pages/ReviewsPage/ReviewsPage';
// import MovieDetailsPage from 'pages/MovieDetailsPage/MovieDetailsPage.jsx';
// import MoviesPage from 'pages/MoviesPage/MoviesPage.jsx';
import { Route, Routes } from 'react-router-dom';
import Layout from 'Layout/Layout';
import { Suspense, lazy } from 'react';
import Loader from './Loader/Loader';

const HomePage = lazy(() => {
  return import('pages/HomePage/HomePage');
});
const CastPage = lazy(() => {
  return import('pages/CastPage/CastPage');
});
const ReviewsPage = lazy(() => {
  return import('pages/ReviewsPage/ReviewsPage');
});
const MovieDetailsPage = lazy(() => {
  return import('pages/MovieDetailsPage/MovieDetailsPage');
});
const MoviesPage = lazy(() => {
  return import('pages/MoviesPage/MoviesPage');
});

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route
          path="movies/:movieId"
          element={
            <Suspense fallback={<Loader />}>
              <MovieDetailsPage />
            </Suspense>
          }
        >
          <Route
            path="cast/:id"
            element={
              <Suspense fallback={<Loader />}>
                <CastPage />
              </Suspense>
            }
          />
          <Route
            path="reviews/:id"
            element={
              <Suspense fallback={<Loader />}>
                <ReviewsPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
