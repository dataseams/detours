const webpack = require("webpack");

module.exports = {
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin({
      REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
      FIREBASE_PUBLIC_API_KEY: process.env.FIREBASE_PUBLIC_API_KEY,
      FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PUBLIC_API_KEY,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
      SESSION_SECRET_CURRENT: process.env.SESSION_SECRET_CURRENT,
      SESSION_SECRET_PREVIOUS: process.env.SESSION_SECRET_PREVIOUS,
      CORE_API_URL: process.env.CORE_API_URL,
      LOGIN_API_URL: process.env.LOGIN_API_URL,
      LOGOUT_API_URL: process.env.LOGOUT_API_URL
    }));
    return config;
  }
};
