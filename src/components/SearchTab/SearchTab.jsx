import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Input, Row, Layout } from 'antd';

import './SearchTab.css';
import MovieCard from '../MovieCard';
import PaginationBlock from '../PaginationBlock';

const { Search } = Input;
const { Content } = Layout;

function SearchTab() {
  const [query, setQuery] = useState('');
  const [paginationInfo, setPaginationInfo] = useState({ page: 1, totalPages: 0 });

  useEffect(() => {
    setPaginationInfo((prevInfo) => {
      if (query === '') {
        return { page: 1, totalPages: 0 };
      }
      return { ...prevInfo, page: 1 };
    });
  }, [query]);

  const onChangeFn = debounce((evt) => {
    setQuery(evt.target.value);
  }, 500);
  return (
    <>
      <Search className="search" placeholder="Type to search" allowClear onChange={onChangeFn} enterButton />
      <Content>
        <Row justify="space-evenly" gutter={[16, 16]}>
          <MovieCard query={query} pages={paginationInfo} setPages={(p) => setPaginationInfo(p)} />
        </Row>
      </Content>
      {query && <PaginationBlock pages={paginationInfo} setPages={(p) => setPaginationInfo(p)} />}
    </>
  );
}

export default SearchTab;
