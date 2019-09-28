import Layout from '../components/MainLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const HowItWorks = props => (
  <Layout>
    <h1>Somehow it does.</h1>
    <style jsx>{`
      h1 {
        color: Gray;
        margin-top: 100px;
      }
    `}
    </style>
  </Layout>
);

export default HowItWorks;
