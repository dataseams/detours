import Layout from '../components/MainLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const HowItWorks = props => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <style jsx>{`
      h1 {
        color: Blue;
        margin-top: 100px;
      }
    `}
    </style>
  </Layout>
);

export default HowItWorks;
