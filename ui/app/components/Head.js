import Head from 'next/head'

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://indestructibletype.com/fonts/Jost.css" type="text/css" charset="utf-8" />
    </Head>
    <style jsx global>{`
      body {
        font-family: Jost;
        color: #4F4F4F;
      }
      a {
        color: #4F4F4F;
      }
      button {
        border-radius: 3px;
        font-family: Jost;
        font-size: 16px;
        padding: 12px 24px;
      }
    `}</style>
  </div>
)
