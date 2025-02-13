import { useState, useEffect } from 'react';
import { Row, Layout, Result } from 'antd';

import './RatedTab.css';
import PaginationBlock from '../PaginationBlock';
import { GenresProvider } from '../../services/GenresContext';
import FetchData from '../../services/FetchData';
import MovieCard from '../MovieCard';

const { Content } = Layout;

function RatedTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [movieList, setMovieList] = useState({ results: [], total_pages: 0 });
  const [error, setError] = useState(null);

  const fetchRatedMovies = async () => {
    try {
      const ratedMovies = await FetchData.getRatedMovies(currentPage);
      setMovieList(ratedMovies);
      setTotal(ratedMovies.total_results);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRatedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <>
      <Content>
        <Row justify="space-evenly" gutter={[16, 16]}>
          <GenresProvider>
            {error && (
              <div className="error">
                <Result status="404" title="404" subTitle={error} />
              </div>
            )}
            {movieList.results.slice(0, 4).map((movie) => (
              <MovieCard key={movie.id} movie={movie} disabled />
            ))}
          </GenresProvider>
        </Row>
      </Content>
      <PaginationBlock currentPage={currentPage} total={total} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default RatedTab;
