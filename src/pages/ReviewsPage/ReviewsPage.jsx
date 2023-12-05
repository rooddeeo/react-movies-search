import {getMovies} from "api/movies"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ReviewsPage = () => {
  const [reviewsData, setReviewsData] = useState({})
  const {movieId} = useParams();
  useEffect(() => {
    if(!movieId) {return} else {
      const handleReviews = async () => {
  try {
    const data = await getMovies(`movie/${movieId}/reviews`)
    setReviewsData(data)
  } catch (error) {
  }
}
handleReviews()
    }
  }, [movieId])
const reviews = reviewsData.results ? reviewsData.results.map(review =>
    <ul key={review.id}>
      <li>
        <h4>Author: {review.author}</h4>
      </li>
      <li>
<p>{review.content}</p>
      </li>
    </ul>
    ) : 'We don`t have any reviews for this movie.'
  return (
<>
{reviews}
</>
  )
}
export default ReviewsPage