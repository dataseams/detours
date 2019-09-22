import Layout from '../components/MainLayout';
import Link from 'next/link';

const Index = props => (
  <Layout>
    <div>
      <h1 id="h1-first">Plan your dream vacation,</h1>
      <h1 id="h1-second">tailored just for you.</h1>
      <p id="subheader">Fill out a short questionnaire and get a personalized itinerary.</p>
      <button><Link><a href="/survey">Get Started</a></Link></button>
      <div id="landing-2">
        <div id="sample-itineraries">
          <p>See sample itineraries to:</p>
          <div id="city-1">
            <img src="/static/paris.png" alt="Paris, France" />
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      div {
        text-align: center;
      }

      #h1-first {
        margin: 150px 0px 0px 0px;
      }

      #h1-second {
        margin: 0px 0px 0px 0px;
      }

      h1 {
        font-size: 3em;
        font-weight: bold;
        letter-spacing: 0px;
      }

      p {
        font-size: 1em;
        letter-spacing: 0;
      }

      button {
        margin: 10px 0 30px 0;
        text-align: center;
        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
        background-color: #5865BC;
        border: none;
        opacity: 1;
        height: 46px;
        border-radius: 2px;
      }

      button a {
        float: right;
        display: block;
        color: white;
        text-align: left;
        text-decoration: none;
        opacity: 1;
      }

      button:hover {
        background-color: #5865BC;
        -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
        -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
        box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
      }
    `}
    </style>
  </Layout>
);

export default Index;
