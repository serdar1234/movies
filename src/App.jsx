/* eslint-disable no-console */
import React, { useState } from 'react';
import { Row, Col, Layout } from 'antd';

import HeadingBlock from './components/HeadingBlock';
import OnlineStatus from './services/OnlineStatus';
import MovieCard from './components/MovieCard';
import PaginationBlock from './components/PaginationBlock';

const { Content } = Layout;

function App() {
  const [query, setQuery] = useState('');
  console.log(query);
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
          <Row justify="space-between" align="middle">
            <MovieCard query={query} />
          </Row>
        </Content>
        <PaginationBlock />
      </Col>
    </Row>
  );
}
export default App;
