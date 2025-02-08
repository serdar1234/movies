import { debounce } from 'lodash';
import { Input, Row, Layout } from 'antd';

import './SearchTab.css';
import MovieCard from '../MovieCard';

const { Search } = Input;
const { Content } = Layout;

function SearchTab({ onQueryChange, query, pages, setPages }) {
  const onChangeFn = debounce((evt) => {
    onQueryChange(evt.target.value);
  }, 500);
  return (
    <>
      <Search placeholder="Type to search" allowClear onChange={onChangeFn} enterButton />
      <Content>
        <Row justify="space-evenly" gutter={[16, 16]}>
          <MovieCard query={query} pages={pages} setPages={setPages} />
        </Row>
      </Content>
    </>
  );
}

export default SearchTab;
