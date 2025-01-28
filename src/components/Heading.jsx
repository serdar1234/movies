import { Layout } from 'antd';

const { Header } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

function Heading() {
  return <Header style={headerStyle}>Searchbar will be here</Header>;
}

export default Heading;
