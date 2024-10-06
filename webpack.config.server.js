const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  name: "server",
  target: "node",

  // entry files
  entry: [
    "./server/index.tsx", // react
  ],

  // output files and chunks
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "server.js",
  },

  // module/loaders configuration
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader", //2
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name(arg) {
            if (process.env.NODE_ENV === "development") {
              return "[path][name].[ext]";
            }

            return "[contenthash].[ext]";
          },
          emitFile: false,
          publicPath: "/",
        },
      },
    ],
  },

  // resolve files configuration
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // file extensions
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  devtool: "source-map",
  externals: [nodeExternals()],
};
