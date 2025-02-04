import { Layout, Pagination } from 'antd';

const { Footer } = Layout;
function PaginationBlock({ onPageChange, paginationInfo }) {
  const { page, totalPages } = paginationInfo;
  // console.log(page, totalPages);

  const changePage = (p) => {
    onPageChange((prev) => ({ ...prev, page: p }));
  };

  return (
    <Footer style={{ backgroundColor: 'white' }}>
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
