import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Tag, Spin, Alert, Rate, Result } from 'antd';
import { format } from 'date-fns';

import MovieFetcher from '../../services/MovieFetcher.js';
import truncateString from '../../services/truncateString.js';
import MovieImage from '../MovieImage/MovieImage.jsx';
import './MovieCard.css';

function MovieCard({ query, pages, setPages }) {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const spinner = <Spin indicator={<LoadingOutlined spin />} size="large" />;

  useEffect(() => {
    const updateTitle = async () => {
      try {
        if (query) {
          const data = await MovieFetcher.getMovies(query, pages.page);
          if (typeof data === 'object' && data.results.length) {
            setMovies(data);
            setPages({ page: data.page, totalPages: data.total_results });
            setNoResults(false);
            setErrorMessage(null);
          } else if (data.total_results === 0) {
            setNoResults(true);
            setPages({ page: 1, totalPages: 0 });
          }
        } else {
          setNoResults(false);
          setMovies({});
        }
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    updateTitle();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [query, pages.page]);

  // // Testing
  // console.log(
  //   `movies ${Object.keys(movies)} loading ${loading} noResults ${noResults} errorMessage ${errorMessage} imgStates ${Object.keys(imgStates)} `
  // );

  if (errorMessage) {
    return (
      <div className="error">
        <Alert message={`Error: ${errorMessage}`} type="error" closable />
      </div>
    );
  }
  if (noResults) {
    return (
      <div className="error">
        <Result
          status="404"
          title="404"
          subTitle={`Sorry, we couldn't find any movies for your search term: ${query}. Please try a different keyword or check your spelling!`}
        />
      </div>
    );
  }
  return (
    <>
      {loading && <div className="error">{spinner}</div>}
      {movies.results &&
        movies.results.slice(0, 4).map((movie) => {
          let formattedReleaseDate = 'Unknown Release Date';

          if (movie.release_date) {
            formattedReleaseDate = format(movie.release_date, 'MMMM dd, yyyy');
          }

          return (
            <div className="card" key={movie.id}>
              <MovieImage info={movie} />
              <div className="cardInfo">
                <h5>{truncateString(movie.title, 25)}</h5>
                <div className="movieDate">{formattedReleaseDate}</div>
                <div className="tags">
                  <Tag>Action</Tag>
                  <Tag>Drama</Tag>
                </div>
              </div>
              <div className="movieRating">
                <span>{Math.round(movie.popularity * 10) / 10}</span>
              </div>
              <div className="movieDescription">
                <p>{truncateString(movie.overview)}</p>
              </div>
              <div className="ratingStars">
                <Rate allowHalf style={{ fontSize: '16px' }} count={10} />
              </div>
            </div>
          );
        })}
    </>
  );
}

export default MovieCard;
