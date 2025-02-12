/* eslint-disable no-console */
import { Tabs } from 'antd';

import './TabsBlock.css';
import SearchTab from '../SearchTab';
import RatedTab from '../RatedTab/RatedTab';

const tabStyle = {
  maxWidth: '120px',
  alignSelf: 'center',
  marginTop: '10px',
};

function TabsBlock() {
  const items = [
    {
      key: '1',
      label: 'Search',
      children: <SearchTab />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedTab />,
    },
  ];

  return <Tabs defaultActiveKey="1" tabBarStyle={tabStyle} items={items} onChange={() => console.log('tabs')} />;
}

export default TabsBlock;
