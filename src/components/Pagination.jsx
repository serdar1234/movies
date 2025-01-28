import { Layout } from 'antd';

const { Footer } = Layout;
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

function Pagination() {
  return <Footer style={footerStyle}>place for pagination</Footer>;
}

export default Pagination;
