import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { ApolloProvider } from "@apollo/react-hooks";

import withData from "../utils/apolloclient";

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent,
          and simple baseline to build upon. */}
          <CssBaseline />
          <ApolloProvider client={apollo}>
            <Component {...pageProps} client={apollo} />
          </ApolloProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default withData(MyApp);
