import { getMovies } from 'api/movies';
import ErrorBackEnd from 'components/ErrorBackEnd/ErrorBackEnd';
import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './ReviewsPage.module.css';

const ReviewsPage = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const { movieId } = useParams();
  const [isLoader, setIsLoader] = useState(false);
  const [errorBackEnd, setErrorBackEnd] = useState('');

  useEffect(() => {
    if (!movieId) return;
    const handleReviews = async () => {
      try {
        setIsLoader(true);
        const data = await getMovies(`movie/${movieId}/reviews`);
        setReviewsData(data);
        setIsLoader(false);
      } catch (error) {
        setErrorBackEnd(error.message);
      } finally {
        setIsLoader(false);
      }
    };
    handleReviews();
  }, [movieId]);

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {errorBackEnd && <ErrorBackEnd errorBackEnd={errorBackEnd} />}
        {isLoader && <Loader />}
        {reviewsData.results && reviewsData.results.length > 0 ? (
          reviewsData.results.map(review => (
            <li className={css.listItem} key={review.id}>
              <p className={css.listParagraphAuthor}>Author: {review.author}</p>

              <p className={css.listParagraphContent}>{review.content}</p>
            </li>
          ))
        ) : (
          <p className={css.paragraph}>
            We don`t have any reviews for this movie.
          </p>
        )}
      </ul>
    </div>
  );
};
export default ReviewsPage;
