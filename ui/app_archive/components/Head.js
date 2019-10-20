import Head from "next/head";

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://indestructibletype.com/fonts/Jost.css"
        type="text/css"
        charSet="utf-8"
      />
    </Head>
    <style jsx global>{`
      body {
        font-family: Jost;
        color: #4f4f4f;
      }

      a {
        color: #4f4f4f;
      }

      button {
        border-radius: 2px;
        font-family: Jost;
        font-size: 16px;
        padding: 12px 24px;
      }

      .get-started-button {
        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
        background-color: #5865bc;
        border: none;
        text-align: left;
        opacity: 1;
        height: 46px;
      }

      .get-started-button a {
        color: white;
        text-align: left;
        text-decoration: none;
      }

      .get-started-button:hover {
        background-color: #5865bc;
        -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
        -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
        box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
        cursor: pointer;
      }
    `}</style>
  </div>
);
