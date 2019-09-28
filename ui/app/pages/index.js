import Layout from '../components/MainLayout';
import Link from 'next/link';

const testimonial_1_avatar = "/static/kathleen.png"
const testimonial_2_avatar = "/static/kathleen.png"
const testimonial_3_avatar = "/static/kathleen.png"

const testimonial_1_text = "This travel agent and concierge rolled into one will construct a highly detailed itinerary for you that includes the best restaurants, sights, and events for your trip.";
const testimonial_2_text = "This travel agent and concierge rolled into one will construct a highly detailed itinerary for you that includes the best restaurants, sights, and events for your trip.";
const testimonial_3_text = "This travel agent and concierge rolled into one will construct a highly detailed itinerary for you that includes the best restaurants, sights, and events for your trip.";

const testimonial_1_signature = "Kathleen Brown"
const testimonial_2_signature = "Kathleen Brown"
const testimonial_3_signature = "Kathleen Brown"

const Index = props => (
  <Layout>
    <div id="landing-1">
      <h1>Plan your dream vacation, tailored just for you.</h1>
      <p id="subtitle">Fill out a short questionnaire and get a personalized itinerary in <b>5 minutes.</b></p>
      <Link href="/survey"><button><a>Get Started</a></button></Link>
    </div>
    <div id="landing-2">
      <div id="sample-itineraries">
        <div id="sample-images">
          <p id="sample-itineraries-header">See sample itineraries to:</p>
          <div id="city-1" className="image-container">
            <div className="shadow-container">
              <img className="city-image" src="/static/paris.png" alt="Paris, France" />
              <span className="img-text">Paris, France</span>
            </div>
          </div>
          <div id="city-2" className="image-container">
            <div className="shadow-container">
              <img className="city-image" src="/static/nyc.png" alt="NYC, NY" />
              <span className="img-text">New York, NY</span>
            </div>
          </div>
          <div id="city-3" className="image-container">
            <div className="shadow-container">
              <img className="city-image" src="/static/goldengate.png" alt="San Francisco, CA" />
              <span className="img-text">San Francisco, CA</span>
            </div>
          </div>
          <div id="city-4" className="image-container">
            <div className="shadow-container">
              <img className="city-image" src="/static/barcelona.png" alt="Barcelona, Spain" />
              <span className="img-text">Barcelona, Spain</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="landing-3">
      <div id="testimonials">
        <p id="testimonials-header">What our customers say</p>
        <div id="testimonials-container">
          <div id="testimonial-1" className="testimonial-container">

            <div id="testimonial-img-container">
                <img className="testimonial-img" src={testimonial_1_avatar}></img>
            </div>
            <div>
              <div><img src="/static/left_quotes.svg"></img></div>
              <div className="testimonial-content">{testimonial_1_text}</div>
              <div><img src="/static/right_quotes.svg"></img></div>
            </div>
            <div className="testimonial-signature">{testimonial_1_signature}</div>
          </div>

          <div id="testimonial-2" className="testimonial-container">
            <div id="testimonial-img-container">
                <img className="testimonial-img" src={testimonial_2_avatar}></img>
            </div>
            <div>
              <div><img src="/static/left_quotes.svg"></img></div>
              <div className="testimonial-content">{testimonial_2_text}</div>
              <div><img src="/static/right_quotes.svg"></img></div>
            </div>
            <div className="testimonial-signature">{testimonial_2_signature}</div>
          </div>

          <div id="testimonial-2" className="testimonial-container">
            <div id="testimonial-img-container">
                <img className="testimonial-img" src={testimonial_3_avatar}></img>
            </div>
            <div>
              <div><img src="/static/left_quotes.svg"></img></div>
              <div className="testimonial-content">{testimonial_3_text}</div>
              <div><img src="/static/right_quotes.svg"></img></div>
            </div>
            <div className="testimonial-signature">{testimonial_3_signature}</div>
          </div>
        </div>
      </div>
    </div>
    <div id="landing-4">
      <p>Copyright &copy; 2019 Data Seams, LLC</p>
    </div>
    <style jsx>{`
      div {
        text-align: center;
      }

      h1 {
        padding-top: 150px;
        margin: auto;
        text-align: center;
        max-width: 600px;
        font-size: 3em;
        font-weight: bold;
        letter-spacing: 0px;
      }

      p {
        font-size: 1em;
        letter-spacing: 0;
      }

      #subtitle {
        margin: auto;
        max-width: 420px;
        padding: 20px 0 20px 0;
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
        -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.6);
        -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.6);
        box-shadow: 5px 40px -10px rgba(0,0,0,0.6);
        cursor: pointer;
      }

      #landing-2 {
        justify-text: center;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #sample-itineraries {
        margin: auto;
        width: 90%;
        background-color: #5865BC;
        padding: 25px 40px 25px 40px;
      }

      #sample-images {
        display: inline-block;
      }

      #sample-itineraries-header {
        color: white;
        font-size: 1.3em;
        text-align: left;
        padding-left: 10px;
      }

      .shadow-container {
        box-shadow: 0px 3px 6px #00000029;
      }

      .image-container {
        display: inline-block;
        padding: 10px 25px 50px 10px;
      }

      .shadow-container:hover {
        -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.4);
        -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.4);
        box-shadow: 5px 40px -10px rgba(0,0,0,0.4);
        cursor: pointer;
      }

      .city-image {
        max-width: 100%;
        object-fit: cover;
        width: 220px;
        height: 150px;
        border-radius: 2px 2px 0 0;
      }

      .img-text {
        background-color: white;
        text-align: left;
        padding: 10px;
        font-size: 0.9em;
        display: block;
        margin-top: -7px;
        border-radius: 0 0 2px 2px;
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

      .testimonials-container {
        margin: 20px;
        width: 100%;
        height: auto;
        text-align: left;
        background-color: #5865BC;
        padding: 25px 20px 20px 30px;
      }

      .testimonial-container {
        display: inline-block;
        padding: 0 70px 0 0;
        width: 250px;
        height: 150px;
      }

      .testimonial-content {
        display: flex;
        text-align: left;
        padding: 10px 0 15px 0;
      }

      .testimonial-img {
        clip-path: circle(45px at center);
      }

      .testimonial-text {
        text-align: left;
      }

      .testimonial-signature {
        text-align: left;
        margin: 30px 5px 0 0;
      }

      #landing-4 {
        margin-left: -20px;
        margin-bottom: -20px;
        text-align: left;
        background-color: #5865BC;
        width: calc(100% + 20px);
        color: white;
        padding: 10px 10px 60px 10px;
        font-size: 0.9em;
      }
    `}
    </style>
  </Layout>
);

export default Index;
