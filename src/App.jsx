/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Row, Col, Result } from 'antd';

import PaginationBlock from './components/PaginationBlock';
import TabsBlock from './components/TabsBlock';

function App() {
  const [query, setQuery] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [paginationInfo, setPaginationInfo] = useState({ page: 1, totalPages: 0 });

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
        {isOnline ? (
          <>
            <TabsBlock
              onQueryChange={(q) => setQuery(q)}
              query={query}
              pages={paginationInfo}
              setPages={(p) => setPaginationInfo(p)}
            />
            <PaginationBlock paginationInfo={paginationInfo} onPageChange={(p) => setPaginationInfo(p)} />
          </>
        ) : (
          <Result status="Offline" title="Offline" subTitle="No Internet connection detected" />
        )}
      </Col>
    </Row>
  );
}
export default App;
