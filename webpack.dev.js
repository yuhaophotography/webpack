const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    document: "./src/document.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240 * 2
            }
          }
        ]
      },
      {
        test: /\.(otf|ttf|woff|woff2)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      chunks: ["index"],
      inject: true,
      minify: {
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        preserveLineBreaks: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/document.html"),
      filename: "document.html",
      chunks: ["document"],
      inject: true,
      minify: {
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        preserveLineBreaks: false
      }
    })
  ],
  devServer: {
    contentBase: "dist",
    hot: true
  }
};
