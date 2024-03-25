const util = require("util");
const buffer = require("buffer");
const webpack = require("webpack");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new NodePolyfillPlugin()
  ],
  resolve: {
    extensions: [".js"],
    fallback: {
      util: util,
      buffer: buffer,
    },
  },
};
