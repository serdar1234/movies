import { Layout, Pagination } from 'antd';
import './PaginationBlock.css';

const { Footer } = Layout;
function PaginationBlock({ currentPage, total, setCurrentPage }) {
  return (
    <Footer className="footer">
      <Pagination
        align="center"
        pageSize={20}
        current={currentPage}
        onChange={setCurrentPage}
        showSizeChanger={false}
        total={total}
      />
    </Footer>
  );
}

export default PaginationBlock;
