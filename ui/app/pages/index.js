import Layout from '../components/MainLayout';
import Link from 'next/link';

const Index = props => (
  <Layout>
    <div>
      <h1 id="h1-first">Plan your dream vacation,</h1>
      <h1 id="h1-second">tailored just for you.</h1>
      <p>Fill out a short questionnaire and get a personalized itinerary.</p>
      <button><Link><a href="/survey">Get Started</a></Link></button>
      <div id="landing-2">
        <div id="sample-itineraries">
          <p id="see-text">See sample itineraries to:</p>
          <div id="sample-images">
            <div id="city-1" className="image">
              <img src="/static/paris.png" alt="Paris, France" />
              <div className="img-text">Paris, France</div>
            </div>
            <div id="city-2" className="image">
              <img src="/static/nyc.png" alt="NYC, NY" />
              <div className="img-text">New York, NY</div>
            </div>
            <div id="city-3" className="image">
              <img src="/static/goldengate.png" alt="San Francisco, CA" />
              <div className="img-text">San Francisco, CA</div>
            </div>
            <div id="city-4" className="image">
              <img src="/static/barcelona.png" alt="Barcelona, Spain" />
              <div className="img-text">Barcelona, Spain</div>
            </div>
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

      img {
        max-width: 100%;
        object-fit: contain;
        margin: 0;
        padding: 0;
      }

      #landing-2 {
        justify-text: center;
        display: flex;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }

      #sample-itineraries {
        width: 80%;
        height: auto;
        text-align: left;
        background-color: #5865BC;
        padding: 25px 20px 20px 30px;
      }

      #see-text {
        color: white;
      }

      #sample-images {
        display: flex;
      }

      #city-1 {
        padding-right: 25px;
        width: 250px;
        height: 250px;
      }

      #city-2 {
        padding-right: 25px;
        width: 250px;
        height: 250px;
      }

      #city-3 {
        padding-right: 25px;
        width: 250px;
        height: 250px;
      }

      #city-4 {
        padding: 0px 10px 5px 20px;
        width: 250px;
        height: 250px;
      }

      .img-text {
        background-color: white;
        text-align: left;
        padding: 10px;
        font-size: 0.9em;
      }
    `}
    </style>
  </Layout>
);

export default Index;
