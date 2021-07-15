import React from "react";
import App from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { ApolloProvider } from "@apollo/react-hooks";
import CookieBanner from "../components/CookieBanner";
import { cookieReducers } from "../redux/reducers";
import withData from "../utils/apolloclient";

class DetoursApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    const store = createStore(cookieReducers);

    return (
      <React.Fragment>
        <Head>
          <title>Detours</title>
        </Head>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent,
          and simple baseline to build upon. */}
            <CssBaseline />
            <ApolloProvider client={apollo}>
              <Component {...pageProps} client={apollo} />
              <CookieBanner />
            </ApolloProvider>
          </ThemeProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

export default withData(DetoursApp);
