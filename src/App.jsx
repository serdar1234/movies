import React from 'react';
import { Row, Col, Layout } from 'antd';

import Heading from './components/Heading';
import MovieCard from './components/MovieCard';
import Pagination from './components/Pagination';

const { Content } = Layout;
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  backgroundColor: 'white',
};

function App() {
  return (
    <Row>
      <Col
        lg={{ span: 24, offset: 0 }}
        xl={{ span: 18, offset: 3 }}
        style={{
          minHeight: '100vh',
          backgroundColor: 'white',
        }}
      >
        <Heading />
        <Content style={contentStyle}>
          <Row>
            <MovieCard />
          </Row>
        </Content>
        <Pagination />
      </Col>
    </Row>
  );
}
export default App;
