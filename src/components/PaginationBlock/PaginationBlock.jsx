import { Layout, Pagination } from 'antd';

const { Footer } = Layout;

function PaginationBlock() {
  return (
    <Footer style={{ backgroundColor: 'white' }}>
      <Pagination align="center" defaultCurrent={1} total={10000} />
    </Footer>
  );
}

export default PaginationBlock;
