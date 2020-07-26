if (process.env.NODE_ENV !== "production") {
  const { parsed: localEnv } = require("dotenv").config({ path: "./.env.dev" });
  const webpack = require("webpack");

  module.exports = {
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
      return config;
    }
  };
}
else {
  const { parsed: localEnv } = require("dotenv").config({ path: "./.env.gcp" });
  const webpack = require("webpack");

  module.exports = {
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
      return config;
    }
  };
}
