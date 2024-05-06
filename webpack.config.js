const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  mode: process.env.NODE_ENV || "production",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: "ts-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets/images", to: "assets/images" },
        { from: "src/assets/fonts", to: "assets/fonts" },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "pixi app with typescript",
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
};
