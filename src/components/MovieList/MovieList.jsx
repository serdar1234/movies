import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Alert, Result } from 'antd';

import DataFetcher from '../../services/DataFetcher.js';
import MovieCard from '../MovieCard/MovieCard.jsx';
import './MovieList.css';

function MovieList({ query, currentPage, setTotal }) {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const spinner = <Spin indicator={<LoadingOutlined spin />} size="large" />;
  useEffect(() => {
    const updateTitle = async () => {
      try {
        if (query) {
          const data = await DataFetcher.getMovies(query, currentPage);
          if (data.total_results > 0) {
            setMovies(data);
            setTotal(data.total_results);
            setNoResults(false);
            setErrorMessage(null);
          } else {
            setNoResults(true);
            setTotal(0);
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
  }, [query, currentPage, setTotal]);

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

export default MovieList;
