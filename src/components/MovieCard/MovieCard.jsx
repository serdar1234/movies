/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { Tag, Col } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';

import MovieFetcher from '../../services/MovieFetcher.js';

import './MovieCard.css';

function MovieCard() {
  const [dataY, setData] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track any errors

  useEffect(() => {
    const updateTitle = async () => {
      try {
        const data = await MovieFetcher.getData('return');
        if (Array.isArray(data)) {
          setData(data); // Ensure we're setting an array
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error fetching movies:', e);
        setError(error.message); // Set error state
      } finally {
        setLoading(false); // Stop loading
      }
    };

    updateTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array for running once on mount
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error: {error}</h1>
      ) : (
        dataY.map((dataX) => {
          try {
            const formattedReleaseDate = format(dataX.release_date, 'MMMM dd, yyyy');
            return (
              <Col md={12} sm={24} key={dataX.id}>
                <div className="card">
                  <div className="cardImg">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${dataX.poster_path}`}
                      alt={dataX.title}
                      className="imgStyle"
                    />
                  </div>
                  <div className="cardInfo">
                    <h5>{dataX.title}</h5>
                    <div className="movieDate">{formattedReleaseDate}</div>
                    <Tag>Action</Tag>
                    <Tag>Drama</Tag>
                    <p>{dataX.overview}</p>
                  </div>
                </div>
              </Col>
            );
          } catch (e) {
            console.error('Error formatting date:', e);
            return (
              <Col md={12} sm={24} key={dataX.id}>
                <div className="card">
                  <div className="cardImg">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${dataX.poster_path}`}
                      alt={dataX.title}
                      className="imgStyle"
                    />
                  </div>
                  <div className="cardInfo">
                    <h5>{dataX.title}</h5>
                    <div className="movieDate">Unknown Release Date</div>
                    <Tag>Action</Tag>
                    <Tag>Drama</Tag>
                    <p>{dataX.overview}</p>
                  </div>
                </div>
              </Col>
            );
          }
        })
      )}
    </>
  );
}

export default MovieCard;
