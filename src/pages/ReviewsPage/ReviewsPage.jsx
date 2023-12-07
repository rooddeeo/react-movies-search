import { getMovies } from 'api/movies';
import ErrorBackEnd from 'components/ErrorBackEnd/ErrorBackEnd';
import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    <div>
      {errorBackEnd && <ErrorBackEnd errorBackEnd={errorBackEnd} />}
      {isLoader && <Loader />}
      {reviewsData.results && reviewsData.results.length > 0 ? (
        reviewsData.results.map(review => (
          <ul key={review.id}>
            <li>
              <h4>Author: {review.author}</h4>
            </li>
            <li>
              <p>{review.content}</p>
            </li>
          </ul>
        ))
      ) : (
        <p>We don`t have any reviews for this movie.</p>
      )}
    </div>
  );
};
export default ReviewsPage;
