import React from 'react';
import { Row, Col, Layout } from 'antd';

import OnlineStatus from './services/OnlineStatus';
import Heading from './components/Heading';
import MovieCard from './components/MovieCard';
import Pagination from './components/Pagination';

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
        <Heading />
        <OnlineStatus />
        <Content>
          <Row justify="space-around" align="middle">
            <MovieCard />
          </Row>
        </Content>
        <Pagination />
      </Col>
    </Row>
  );
}
export default App;
