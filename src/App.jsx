import React, { useState, useEffect } from 'react';
import { Row, Col, Result } from 'antd';

import TabsBlock from './components/TabsBlock';
import SetSession from './services/SetSession.jsx';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  function checkOnlineStatus() {
    setIsOnline(navigator.onLine);
  }

  SetSession();

  useEffect(() => {
    window.addEventListener('offline', checkOnlineStatus);
    window.addEventListener('online', checkOnlineStatus);
  }, []);

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
          <TabsBlock />
        ) : (
          <Result status="Offline" title="Offline" subTitle="No Internet connection detected" />
        )}
      </Col>
    </Row>
  );
}
export default App;
