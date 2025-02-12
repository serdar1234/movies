import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Alert, Result } from 'antd';

import dataFetcher from '../../services/DataFetcher.js';
import MovieCard from '../MovieCard/MovieCard.jsx';
import './MoviesList.css';

function MoviesList({ query, currentPage, setTotalPages }) {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const spinner = <Spin indicator={<LoadingOutlined spin />} size="large" />;
  useEffect(() => {
    console.log('useEffect');
    const updateTitle = async () => {
      try {
        if (query) {
          // get rated movies
          const data = await dataFetcher.getMovies(query, currentPage);
          if (data.total_results > 0) {
            setMovies(data);
            setTotalPages(data.total_pages);
            setNoResults(false);
            setErrorMessage(null);
          } else {
            setNoResults(true);
            setTotalPages(0);
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
  }, [query, currentPage, setTotalPages]);

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
          return <MovieCard key={movie.id} movie={movie} />;
        })}
    </>
  );
}

export default MoviesList;
