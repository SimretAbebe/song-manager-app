const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.js",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js",
      clean: true,
      publicPath: "/",
    },

    mode: isProduction ? "production" : "development",

    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: 3003,
      hot: true,
      open: true,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
              plugins: ["@emotion/babel-plugin"],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name][ext]",
          },
        },
      ],
    },

    resolve: {
      extensions: [".js", ".jsx"],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development",
        ),
        "process.env.API_BASE_URL": JSON.stringify(
          process.env.API_BASE_URL || "https://jsonplaceholder.typicode.com",
        ),
      }),
    ],
  };
};
