const webpack = require("webpack");

module.exports = {
  webpack: config => {
    config.plugins.push(new webpack.DefinePlugin({
      REACT_APP_GOOGLE_MAPS_API_KEY: "AIzaSyA05uivjJgdd-je2byY6yFjGnvZTGb89z8",
      FIREBASE_CLIENT_EMAIL: "sam@detours.com",
      FIREBASE_PUBLIC_API_KEY: "AIzaSyAhBZ-ksjbq6cB8cE7mFJV25mieAyKdsuM",
      FIREBASE_PRIVATE_KEY: "AIzaSyAhBZ-ksjbq6cB8cE7mFJV25mieAyKdsuM",
      FIREBASE_API_KEY: "AIzaSyAhBZ-ksjbq6cB8cE7mFJV25mieAyKdsuM",
      FIREBASE_AUTH_DOMAIN: "detours-bb95f.firebaseapp.com",
      FIREBASE_DATABASE_URL: "https://detours-bb95f.firebaseio.com",
      FIREBASE_PROJECT_ID: "detours-bb95f",
      FIREBASE_STORAGE_BUCKET: "detours-bb95f.appspot.com",
      FIREBASE_MESSAGING_SENDER_ID: "1093347990752",
      FIREBASE_APP_ID: "1:1093347990752:web:c76d082af65630feed4485",
      FIREBASE_MEASUREMENT_ID: "G-HHTS8X31N4",
      SESSION_SECRET_CURRENT: "abc",
      SESSION_SECRET_PREVIOUS: "def",
      CORE_API_URL: "http://localhost:5000/graphql",
      LOGIN_API_URL: "http://localhost:3000/api/login",
      LOGOUT_API_URL: "http://localhost:3000/api/logout"
    }));
    return config;
  }
};
