import Link from "next/link";

const Header = () => (
  <div id="navbar">
    <div>
      <Link href="/survey">
        <button id="get-started" className="get-started-button">
          <a>Get Started</a>
        </button>
      </Link>
      <ul>
        <li>
          <Link href="/about">
            <a>About Us</a>
          </Link>
        </li>
        <li>
          <Link href="/pricing">
            <a>Pricing</a>
          </Link>
        </li>
        <li>
          <Link href="/how-it-works">
            <a>How It Works</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
      </ul>
    </div>

    <style jsx>
      {`
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
          height: 46px;
        }

        li a {
          font: Medium 18px/26px Jost *;
          float: right;
          display: block;
          text-align: left;
          padding: 14px 16px;
          text-decoration: none;
        }

        li a:hover {
          background-color: #5865bc;
          color: white;
          opacity: 0.8;
        }

        #get-started {
          float: right;
        }
      `}
    </style>
  </div>
);

export default Header;
