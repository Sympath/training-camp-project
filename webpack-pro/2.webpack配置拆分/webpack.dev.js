const { webpack } = require("webpack");
const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");

module.exports = merge(base, {
  mode: "development",
  devServer: {
    hot: true, // 本质上是开启了HotModuleReplacementPlugin，也可以通过--hot启动
    contentBase: "./dist",
  },
  devtool: "source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});