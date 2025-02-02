import { Layout, Pagination } from 'antd';

const { Footer } = Layout;

function PaginationBlock({ onPageChange, totalPages }) {
  const changePage = (page) => {
    if (page > totalPages) onPageChange({ page: 1, totalPages });
    else onPageChange({ page, totalPages });
  };
  return (
    <Footer style={{ backgroundColor: 'white' }}>
      <Pagination
        align="center"
        pageSize={20}
        onChange={(page) => changePage(page)}
        showSizeChanger={false}
        defaultCurrent={1}
        total={totalPages}
      />
    </Footer>
  );
}

export default PaginationBlock;
