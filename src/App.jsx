import React from 'react';
import { Row, Col, Layout, Card } from 'antd';

import Heading from './components/Heading';
import Pagination from './components/Pagination';

import TestImg from '/asd.png';

const { Content } = Layout;
const { Meta } = Card;
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

function App() {
  return (
    <Row>
      <Col
        span={18}
        offset={3}
        style={{
          minHeight: '100vh',
          backgroundColor: 'white',
        }}
      >
        <Heading />
        <Content style={contentStyle}>
          <Row>
            <Col md={12} sm={24}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={<img alt="example" src={TestImg} />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
            </Col>
            <Col md={12} sm={24}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={<img alt="example" src={TestImg} />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
            </Col>
          </Row>
        </Content>
        <Pagination />
      </Col>
    </Row>
  );
}
export default App;
