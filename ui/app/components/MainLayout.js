import Meta from '../components/Head';
import Header from './Header';

const layoutStyle = {
  padding: 20,
  border: '1px solid #DDD',
};

const Layout = props => (
  <div style={layoutStyle}>
    <Meta />
    <Header />
    {props.children}
  </div>
);

export default Layout;
