/* eslint-env node */
require("dotenv").config();
process.env.ROOT_DIR = __dirname;
const secrets = require("./vault");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
  webpack: function(config, { defaultLoaders, isServer, webpack }) {
    if (isServer) {
      config.plugins.push(new webpack.DefinePlugin(secrets));
    }
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    config.module.rules.push({
      test: /\.ifdef\.js/,
      use: [
        defaultLoaders.babel,
        {
          loader: "ifdef-loader",
          options: { isServer },
        },
      ],
    });
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    config.module.rules.push({
      test: /\.val\.js/,
      use: [
        defaultLoaders.babel,
        {
          loader: "val-loader",
          options: { isServer },
        },
      ],
    });
    return config;
  },
});
