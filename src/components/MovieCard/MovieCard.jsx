import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Tag, Col, Spin, Alert } from 'antd';
import { format } from 'date-fns';

import TestImg from '/asd.jpg';

import MovieFetcher from '../../services/MovieFetcher.js';
import truncateString from '../../services/truncateString.js';
import './MovieCard.css';

function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const query = 'Vanya';
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

  const spinner = <Spin indicator={<LoadingOutlined spin />} size="large" />;

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
        return (
          <Col lg={12} md={24} key={movie.id}>
            <div className="card">
              <div className="cardImg">
                {!imgLoaded && !imgError && spinner}
                {imgError && <img src={TestImg} alt="Woman in Red" className="imgStyle" />}
                <img
                  src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                  alt={movie.title}
                  className="imgStyle"
                  style={{ display: imgLoaded ? 'block' : 'none' }}
                />
              </div>
              <div className="cardInfo">
                <h5>{truncateString(movie.title, 35)}</h5>
                <div className="movieDate">{formattedReleaseDate}</div>
                <Tag>Action</Tag>
                <Tag>Drama</Tag>
                <p>{truncateString(movie.overview)}</p>
              </div>
            </div>
          </Col>
        );
      })}
    </>
  );
}

export default MovieCard;
