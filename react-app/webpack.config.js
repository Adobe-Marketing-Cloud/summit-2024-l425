const util = require("util");
const buffer = require("buffer");
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  resolve: {
    extensions: [".js"],
    fallback: {
      util: util,
      buffer: buffer,
    },
  },
};
