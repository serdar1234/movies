import { format } from 'date-fns';

import truncateString from '../../services/truncateString.js';
import MovieImage from '../MovieImage/MovieImage.jsx';
import MovieTags from '../MovieTags/MovieTags.jsx';
import RatingStars from '../RatingStars/RatingStars.jsx';
import './MovieCard.css';

function MovieCard({ movie, disabled = false }) {
  let formattedReleaseDate = 'Unknown Release Date';
  const rating = Math.round(movie.vote_average * 10) / 10;

  if (movie.release_date) {
    formattedReleaseDate = format(movie.release_date, 'MMMM dd, yyyy');
  }

  return (
    <div className="card">
      <MovieImage info={movie} />
      <div className="cardInfo">
        <h5>{truncateString(movie.title, 25)}</h5>
        <div className="movieDate">{formattedReleaseDate}</div>
        <MovieTags movieGenres={movie.genre_ids} />
      </div>
      <div className={`movieRating rating${parseInt(rating, 10)}`}>
        <span>{rating}</span>
      </div>
      <div className="movieDescription">
        <p>{truncateString(movie.overview)}</p>
      </div>
      <RatingStars movieID={movie.id} disabled={disabled} />
    </div>
  );
}

export default MovieCard;
