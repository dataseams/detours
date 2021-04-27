import Head from "next/head";

const AppHead = () => {
  return (
    <div>
      <Head>
        <title>Detours - your AI driven travel agent.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://indestructibletype.com/fonts/Jost.css"
          type="text/css"
          charSet="utf-8"
        />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>
    </div>
  );
};

export default AppHead;
