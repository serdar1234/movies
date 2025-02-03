/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Row, Col, Layout } from 'antd';

import HeadingBlock from './components/HeadingBlock';
import OnlineStatus from './services/OnlineStatus';
import MovieCard from './components/MovieCard';
import PaginationBlock from './components/PaginationBlock';

const { Content } = Layout;

function App() {
  const [query, setQuery] = useState('');
  const [paginationInfo, setPaginationInfo] = useState({ page: 1, totalPages: 0 });

  useEffect(() => {
    setPaginationInfo((prevInfo) => ({
      ...prevInfo,
      page: 1,
    }));
    // console.log('app js pagination info', paginationInfo.page, paginationInfo.totalPages);
  }, [query]);

  return (
    <Row justify="space-around">
      <Col
        lg={{ span: 24 }}
        xl={{ span: 17 }}
        style={{
          minHeight: '100vh',
          backgroundColor: 'white',
        }}
      >
        <HeadingBlock onQueryChange={(q) => setQuery(q)} />
        <OnlineStatus />
        <Content>
          <Row justify="space-evenly" gutter={[16, 16]}>
            <MovieCard query={query} pages={paginationInfo} setPages={(p) => setPaginationInfo(p)} />
          </Row>
        </Content>
        <PaginationBlock paginationInfo={paginationInfo} onPageChange={(p) => setPaginationInfo(p)} />
      </Col>
    </Row>
  );
}
export default App;
