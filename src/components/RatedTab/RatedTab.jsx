import { useState } from 'react';
import { Row, Layout } from 'antd';

import './RatedTab.css';
import MovieCard from '../MovieCard';
import PaginationBlock from '../PaginationBlock';
import { GenresProvider } from '../../services/GenresContext';

const { Content } = Layout;

function RatedTab() {
  const [paginationInfo, setPaginationInfo] = useState({ page: 1, totalPages: 0 });

  return (
    <>
      <Content>
        <Row justify="space-evenly" gutter={[16, 16]}>
          <GenresProvider>
            <MovieCard query="123" pages={paginationInfo} setPages={(p) => setPaginationInfo(p)} />
          </GenresProvider>
        </Row>
      </Content>
      <PaginationBlock pages={paginationInfo} setPages={(p) => setPaginationInfo(p)} />
    </>
  );
}

export default RatedTab;
