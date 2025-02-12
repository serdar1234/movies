import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Input, Row, Layout } from 'antd';

import './SearchTab.css';
import PaginationBlock from '../PaginationBlock';
import { GenresProvider } from '../../services/GenresContext';
import MoviesList from '../MoviesList/MoviesList';

const { Search } = Input;
const { Content } = Layout;

function SearchTab() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const onChangeFn = debounce((evt) => {
    setQuery(evt.target.value);
  }, 500);

  return (
    <>
      <Search className="search" placeholder="Type to search" allowClear onChange={onChangeFn} enterButton />
      <Content>
        <Row justify="space-evenly" gutter={[16, 16]}>
          <GenresProvider>
            <MoviesList query={query} currentPage={currentPage} setTotalPages={setTotalPages} />
          </GenresProvider>
        </Row>
      </Content>
      {query && (
        <PaginationBlock
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
}

export default SearchTab;
