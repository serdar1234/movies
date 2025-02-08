/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Row, Col, Layout, Alert } from 'antd';

import MainBlock from './components/MainBlock';
import MovieCard from './components/MovieCard';
import PaginationBlock from './components/PaginationBlock';

const { Content } = Layout;

function App() {
  const [query, setQuery] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [paginationInfo, setPaginationInfo] = useState({ page: 1, totalPages: 0 });
  // console.log('app js pagination info', paginationInfo.page, paginationInfo.totalPages);
  // console.log('query', query);

  function checkOnlineStatus() {
    setIsOnline(navigator.onLine);
  }

  useEffect(() => {
    window.addEventListener('offline', checkOnlineStatus);
    window.addEventListener('online', checkOnlineStatus);
  }, []);

  useEffect(() => {
    setPaginationInfo((prevInfo) => {
      if (query === '') {
        return { page: 1, totalPages: 0 };
      }
      return { ...prevInfo, page: 1 };
    });
  }, [query]);

  return (
    <Row justify="space-around">
      <Col
        xs={{ span: 24 }}
        xl={{ span: 17 }}
        style={{
          minHeight: '100vh',
          backgroundColor: 'white',
        }}
      >
        <MainBlock onQueryChange={(q) => setQuery(q)} />
        <Content>
          <Row justify="space-evenly" gutter={[16, 16]}>
            {isOnline ? (
              <MovieCard query={query} pages={paginationInfo} setPages={(p) => setPaginationInfo(p)} />
            ) : (
              <Alert message="You are offline!" type="error" />
            )}
          </Row>
        </Content>
        <PaginationBlock paginationInfo={paginationInfo} onPageChange={(p) => setPaginationInfo(p)} />
      </Col>
    </Row>
  );
}
export default App;
