import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Tag, Col, Spin, Alert, Rate } from 'antd';
import { format } from 'date-fns';

import fallbackImg from '/asd.jpg';

import MovieFetcher from '../../services/MovieFetcher.js';
import truncateString from '../../services/truncateString.js';
import './MovieCard.css';

function MovieCard({ query }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imgStates, setImgStates] = useState({});

  const spinner = <Spin indicator={<LoadingOutlined spin />} size="large" />;

  useEffect(() => {
    const updateTitle = async () => {
      try {
        const data = await MovieFetcher.getData(query);
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          return <Alert message="Fetched data is not an array" type="error" closable />;
        }
      } catch (e) {
        setErrorMessage(e.message);
        return <Alert message={`Error fetching movies: ${e.message}`} type="error" closable />;
      } finally {
        setLoading(false);
      }
      return 0;
    };

    updateTitle();
  }, [query, setErrorMessage, setMovies, setLoading]);

  return (
    <>
      {loading && <div className="error">{spinner}</div>}
      {errorMessage && (
        <div className="error">
          <Alert message={`Error: ${errorMessage}`} type="error" closable />
        </div>
      )}
      {movies.map((movie) => {
        let formattedReleaseDate = 'Unknown Release Date';
        if (movie.release_date) {
          formattedReleaseDate = format(movie.release_date, 'MMMM dd, yyyy');
        }

        const imgLoaded = imgStates[movie.id] && imgStates[movie.id].loaded ? imgStates[movie.id].loaded : false;
        const imgError = imgStates[movie.id] && imgStates[movie.id].error ? imgStates[movie.id].error : false;

        return (
          <Col md={12} sm={24} key={movie.id}>
            <div className="card">
              <div className="cardImg">
                {!imgLoaded && !imgError && spinner}
                {imgError && <img src={fallbackImg} alt="Fallback" className="imgStyle" />}
                <img
                  src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  onLoad={() => setImgStates((prev) => ({ ...prev, [movie.id]: { loaded: true, error: false } }))}
                  onError={() => setImgStates((prev) => ({ ...prev, [movie.id]: { loaded: false, error: true } }))}
                  alt={movie.title}
                  className="imgStyle"
                  style={{ display: imgLoaded ? 'block' : 'none' }}
                />
              </div>
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
          </Col>
        );
      })}
    </>
  );
}

export default MovieCard;
