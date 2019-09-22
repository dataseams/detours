import Layout from '../components/MainLayout';
import Link from 'next/link';

const Index = props => (
  <Layout>
    <div>
      <h1 id="h1-first">Plan your dream vacation,</h1>
      <h1 id="h1-second">tailored just for you.</h1>
      <p id="subtitle-1">Fill out a short questionnaire and get a personalized itinerary</p>
      <p id="subtitle-2">in <b>5 minutes.</b></p>
      <button><Link><a href="/survey">Get Started</a></Link></button>
      <div id="landing-2">
        <div id="sample-itineraries">
          <p id="see-header">See sample itineraries to:</p>
          <div id="sample-images">
            <div id="city-1" className="image-container">
              <img src="/static/paris.png" alt="Paris, France" />
              <span className="img-text">Paris, France</span>
            </div>
            <div id="city-2" className="image-container">
              <img src="/static/nyc.png" alt="NYC, NY" />
              <span className="img-text">New York, NY</span>
            </div>
            <div id="city-3" className="image-container">
              <img src="/static/goldengate.png" alt="San Francisco, CA" />
              <span className="img-text">San Francisco, CA</span>
            </div>
            <div id="city-4" className="image-container">
              <img src="/static/barcelona.png" alt="Barcelona, Spain" />
              <span className="img-text">Barcelona, Spain</span>
            </div>
          </div>
        </div>
      </div>
      <div id="landing-3">
        <div id="testimonials">
          <p id="testimonials-header">What our customers say</p>
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

      #subtitle-1 {
        margin-bottom: 0;
      }

      #subtitle-2 {
        margin-top: 0;
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

      #landing-2 {
        justify-text: center;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #sample-itineraries {
        margin: 20px;
        width: 100%;
        height: auto;
        text-align: left;
        background-color: #5865BC;
        padding: 25px 20px 20px 30px;
      }

      #see-header {
        color: white;
        font-size: 1.3em;
      }

      img {
        max-width: 100%;
        object-fit: cover;
        margin: 0;
        padding: 0;
      }

      .image-container {
        display: inline-block;
        padding-right: 25px;
        width: 220px;
        height: 220px;
      }

      .img-text {
        background-color: white;
        text-align: left;
        padding: 10px;
        font-size: 0.9em;
        display: block;
        margin-top: -7px;
      }

      #landing-3 {
        justify-text: center;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #testimonials {
        margin: 20px;
        width: 100%;
        height: auto;
        text-align: left;
        padding: 25px 20px 20px 30px;
      }

      #testimonials-header {
        font-size: 1.3em;
      }
    `}
    </style>
  </Layout>
);

export default Index;
