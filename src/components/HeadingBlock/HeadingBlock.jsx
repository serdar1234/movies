/* eslint-disable no-console */
import { Layout, Input, Tabs } from 'antd';
import { debounce } from 'lodash';
import './HeadingBlock.css';

const { Search } = Input;
const { Header } = Layout;
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
  maxWidth: '120px',
  alignSelf: 'center',
  marginTop: '10px',
};

function HeadingBlock({ onQueryChange }) {
  const onChangeFn = debounce((evt) => {
    onQueryChange(evt.target.value);
  }, 500);

  return (
    <Header className="headerStyle">
      <Tabs defaultActiveKey="1" centered tabBarStyle={tabStyle} items={items} onChange={() => console.log('tabs')} />
      <Search placeholder="Type to search" allowClear onChange={onChangeFn} enterButton />
    </Header>
  );
}

export default HeadingBlock;
