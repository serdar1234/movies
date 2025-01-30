/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Tag, Col, Spin } from 'antd';
import { format } from 'date-fns';

import MovieFetcher from '../../services/MovieFetcher.js';

import './MovieCard.css';

function MovieCard() {
  const [dataY, setData] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track any errors

  const query = 'return';
  useEffect(() => {
    const updateTitle = async () => {
      try {
        const data = await MovieFetcher.getData(query);
        if (Array.isArray(data)) {
          setData(data); // Ensure we're setting an array
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (e) {
        setError(e.message); // Set error state
        // eslint-disable-next-line no-console
        console.error('Error fetching movies:', e); // Log the error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    updateTitle();
  }, [query, setError, setData, setLoading]); // Empty dependency array for running once on mount

  function truncateString(str, max = 200) {
    if (str.length <= max) return str;
    let shortStr = str.slice(0, max);
    const lastSpaceIdx = shortStr.lastIndexOf(' ');
    shortStr = shortStr.slice(0, lastSpaceIdx);
    return `${shortStr}...`;
  }

  return (
    <>
      {loading ? (
        <Spin
          indicator={<LoadingOutlined spin />}
          style={{
            fontSize: 48,
            marginInline: 'auto',
          }}
        />
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
                    <h5>{truncateString(dataX.title, 35)}</h5>
                    <div className="movieDate">{formattedReleaseDate}</div>
                    <Tag>Action</Tag>
                    <Tag>Drama</Tag>
                    <p>{truncateString(dataX.overview)}</p>
                  </div>
                </div>
              </Col>
            );
          } catch (e) {
            // eslint-disable-next-line no-console
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
                    <h5>{truncateString(dataX.title, 35)}</h5>
                    <div className="movieDate">Unknown Release Date</div>
                    <Tag>Action</Tag>
                    <Tag>Drama</Tag>
                    <p>{truncateString(dataX.overview)}</p>
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
