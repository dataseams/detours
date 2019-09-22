import Link from 'next/link';

const Header = () => (
  <div id="navbar">
    <div>
      <button><Link><a href="/survey">Get Started</a></Link></button>
      <ul>
        <li><Link><a href="/about-us">About Us</a></Link></li>
        <li><Link><a href="/pricing">Pricing</a></Link></li>
        <li><Link><a href="/how-it-works">How It Works</a></Link></li>
        <li><Link><a href="/">Home</a></Link></li>
      </ul>
    </div>

    <style jsx>{`
      div {
        font-family: Jost;
        font-size: 1em;
      }

      li {
        display: inline;
      }

      ul {
        list-style-type: none;
        margin: 0 20px 0 0;
        overflow: hidden;
        float: right;
        height: 46px
      }

      li a {
        font: Medium 18px/26px Jost*;
        float: right;
        display: block;
        text-align: left;
        padding: 14px 16px;
        text-decoration: none;
      }

      li a:hover {
        background-color: #5865BC;
        color: white;
        opacity: 0.8;
      }

      button {
        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
        background-color: #5865BC;
        border: none;
        text-align: left;
        float: right;
        opacity: 1;
        height: 46px;
      }

      button a {
        float: right;
        display: block;
        color: white;
        text-align: left;
        text-decoration: none;
      }

      button:hover {
        background-color: #5865BC;
        -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
        -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
        box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
      }
    `}
    </style>
  </div>
);

export default Header;
