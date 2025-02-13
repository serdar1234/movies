import { Tabs } from 'antd';
import { useState } from 'react';

import './TabsBlock.css';
import SearchTab from '../SearchTab';
import RatedTab from '../RatedTab/RatedTab';

const tabStyle = {
  maxWidth: '120px',
  alignSelf: 'center',
  marginTop: '10px',
};

function TabsBlock() {
  const [flag, setFlag] = useState(100);
  const onTabChange = (tab) => {
    if (tab === '2') {
      setFlag((prev) => prev + 1);
    }
  };
  const items = [
    {
      key: '1',
      label: 'Search',
      children: <SearchTab />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedTab key={flag} />,
    },
  ];

  return <Tabs defaultActiveKey="1" centered tabBarStyle={tabStyle} items={items} onChange={onTabChange} />;
}

export default TabsBlock;
