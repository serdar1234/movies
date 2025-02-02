/* eslint-disable no-console */
import { Layout, Input, Tabs } from 'antd';

const { Search } = Input;
const { Header } = Layout;
const headerStyle = {
  textAlign: 'center',
  backgroundColor: 'white',
  height: '100px',
};
const items = [
  {
    key: '1',
    label: 'Search',
    children: '',
  },
  {
    key: '2',
    label: 'Rated',
    children: '',
  },
];
const tabStyle = {
  maxWidth: '110px',
  alignSelf: 'center',
  marginTop: '10px',
};

function HeadingBlock() {
  return (
    <Header style={headerStyle}>
      <Tabs defaultActiveKey="1" centered tabBarStyle={tabStyle} items={items} onChange={() => console.log('tabs')} />
      <Search placeholder="Type to search" onSearch={() => console.log('search')} enterButton />
    </Header>
  );
}

export default HeadingBlock;
