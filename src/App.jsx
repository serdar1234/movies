import React from 'react';
import { Row, Col, Layout } from 'antd';

import HeadingBlock from './components/HeadingBlock';
import OnlineStatus from './services/OnlineStatus';
import MovieCard from './components/MovieCard';
import PaginationBlock from './components/PaginationBlock';

const { Content } = Layout;

function App() {
  return (
    <Row justify="space-around">
      <Col
        lg={{ span: 24 }}
        xl={{ span: 18 }}
        style={{
          minHeight: '100vh',
          backgroundColor: 'white',
        }}
      >
        <HeadingBlock />
        <OnlineStatus />
        <Content>
          <Row justify="space-around" align="middle">
            <MovieCard />
          </Row>
        </Content>
        <PaginationBlock />
      </Col>
    </Row>
  );
}
export default App;
