import { Layout, Pagination } from 'antd';
import './PaginationBlock.css';

const { Footer } = Layout;
function PaginationBlock({ setPages, pages }) {
  const { page, totalPages } = pages;

  const changePage = (p) => {
    setPages({ page: p });
  };

  return (
    <Footer className="footer" style={{ backgroundColor: 'white' }}>
      <Pagination
        align="center"
        pageSize={20}
        current={page}
        onChange={changePage}
        showSizeChanger={false}
        total={totalPages}
      />
    </Footer>
  );
}

export default PaginationBlock;
