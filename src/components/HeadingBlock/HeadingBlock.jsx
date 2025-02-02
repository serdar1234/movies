/* eslint-disable no-console */
import { Layout, Input, Tabs } from 'antd';
import { debounce } from 'lodash';

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

function HeadingBlock({ onQueryChange }) {
  const onChangeFn = debounce((evt) => {
    onQueryChange(evt.target.value);
  }, 500);

  return (
    <Header style={headerStyle}>
      <Tabs defaultActiveKey="1" centered tabBarStyle={tabStyle} items={items} onChange={() => console.log('tabs')} />
      <Search placeholder="Type to search" onChange={onChangeFn} onSearch={() => console.log('search')} enterButton />
    </Header>
  );
}

export default HeadingBlock;
