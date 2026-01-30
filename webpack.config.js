const path = require("path");
const webpack = require("webpack"); // Webpack core module

module.exports = {
  // ENTRY POINT: Where webpack starts bundling
  entry: "./src/index.js",

  // OUTPUT: Where bundled files will be generated
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },

  // MODE: Development mode for hot reloading and debugging
  mode: "development",

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3003, // Keep this port to avoid conflicts
    hot: true,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
            plugins: [
              "@emotion/babel-plugin", // Re-enable Emotion CSS-in-JS optimizations
            ],
          },
        },
      },
      // Removed the CSS loader rule for PostCSS/Tailwind
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
    ],
  },

  // RESOLVE: How webpack resolves module imports
  resolve: {
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.API_BASE_URL": JSON.stringify(
        process.env.API_BASE_URL || "https://jsonplaceholder.typicode.com"
      ),
    }),
  ],
};
