import { Layout, Pagination } from 'antd';

import MovieFetcher from '../../services/MovieFetcher';

const { Footer } = Layout;

function PaginationBlock() {
  function getPage(page) {
    MovieFetcher.getData('Vanya', page);
  }

  return (
    <Footer style={{ backgroundColor: 'white' }}>
      <Pagination
        align="center"
        pageSize={20}
        onChange={(page) => getPage(page)}
        showSizeChanger={false}
        defaultCurrent={1}
        total={10000}
      />
    </Footer>
  );
}

export default PaginationBlock;
