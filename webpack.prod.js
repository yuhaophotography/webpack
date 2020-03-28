const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: path.resolve(__dirname, "src/index.js"),
    document: path.resolve(__dirname, "src/document.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")()]
            }
          },
          {
            loader: "px2rem",
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[contenthash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
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
    }),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css"
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano")
    }),
    new CleanWebpackPlugin.CleanWebpackPlugin()
  ]
};
