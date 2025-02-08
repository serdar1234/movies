/* eslint-disable no-console */
import { Tabs } from 'antd';

import './TabsBlock.css';
import SearchTab from '../SearchTab/SearchTab';

const tabStyle = {
  maxWidth: '120px',
  alignSelf: 'center',
  marginTop: '10px',
};

function TabsBlock({ onQueryChange, query, pages, setPages }) {
  const items = [
    {
      key: '1',
      label: 'Search',
      children: <SearchTab onQueryChange={onQueryChange} query={query} pages={pages} setPages={setPages} />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <h1>There will be rated movies here!</h1>,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" centered tabBarStyle={tabStyle} items={items} onChange={() => console.log('tabs')} />
  );
}

export default TabsBlock;
