const webpack = require("webpack");

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        REACT_APP_GOOGLE_MAPS_API_KEY:
          process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        CORE_API_URL: process.env.CORE_API_URL,
        LOGIN_API_URL: process.env.LOGIN_API_URL,
        LOGOUT_API_URL: process.env.LOGOUT_API_URL,
        STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
      })
    );
    return config;
  },
};
