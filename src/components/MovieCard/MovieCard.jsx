/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Tag, Col, Spin } from 'antd';
import { format } from 'date-fns';

// import TestImg from '/asd.jpg';

import MovieFetcher from '../../services/MovieFetcher.js';

import './MovieCard.css';

function MovieCard() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = 'return';
  useEffect(() => {
    const updateTitle = async () => {
      try {
        const data = await MovieFetcher.getData(query);
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (e) {
        setError(e.message); // Set error state
        console.error('Error fetching movies:', e); // Log the error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    updateTitle();
  }, [query, setError, setMovies, setLoading]);

  function truncateString(str, max = 200) {
    if (str.length <= max) return str;
    let shortStr = str.slice(0, max);
    const lastSpaceIdx = shortStr.lastIndexOf(' ');
    shortStr = shortStr.slice(0, lastSpaceIdx);
    return `${shortStr}...`;
  }

  const loader = (
    <Spin
      indicator={<LoadingOutlined spin />}
      style={{
        fontSize: 48,
        marginInline: 'auto',
      }}
    />
  );

  return (
    <>
      {loading && loader}
      {error && <h1>Error: {error}</h1>}
      {movies.map((movie) => {
        let formattedReleaseDate = 'Unknown Release Date';
        if (movie.release_date) {
          formattedReleaseDate = format(movie.release_date, 'MMMM dd, yyyy');
        }
        return (
          <Col md={12} sm={24} key={movie.id}>
            <div className="card">
              <div className="cardImg">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="imgStyle"
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
