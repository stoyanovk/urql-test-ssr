const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const getPlugins = ({ isProd }) => {
  const plugins = [
    // extract css to external stylesheet file
    new MiniCssExtractPlugin({
      filename: isProd ? "build/styles.[fullhash].css" : "build/styles.css",
    }),

    // prepare HTML file with assets
    new HTMLWebpackPlugin({
      filename: "template.html",
      template: path.resolve(__dirname, "src/template.html"),
      minify: false,
      inject: 'body'
    }),
  ];

  if (isProd) {
    plugins.push(new CleanWebpackPlugin());
  }

  return plugins;
};

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  return {
    // entry files
    entry: [
      "./src/index.tsx", // react
    ],

    // output files and chunks
    output: {
      path: path.join(__dirname, "dist"),
      filename: isProd ? "build/[name].[fullhash].js" : "build/[name].js",
      publicPath: "/",
    },

    // module/loaders configuration
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
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
          loader: "file-loader",
          options: {
            name() {
              if (process.env.NODE_ENV === "development") {
                return "[path][name].[ext]";
              }

              return "[contenthash].[ext]";
            },
          },
        },
      ],
    },

    // webpack plugins
    plugins: getPlugins({ isProd }),

    // resolve files configuration
    resolve: {
      // file extensions
      alias: {
        "@": path.resolve(__dirname, "src"),
      },

      extensions: [".css", ".tsx", ".ts"],
    },

    // webpack optimizations
    optimization: {
      minimize: isProd,
      minimizer: isProd ? [new TerserPlugin(), new CssMinimizerPlugin()] : [],
      splitChunks: {
        chunks: "all",
        minSize: 0,
        cacheGroups: {
          vendor: isProd
            ? {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  const packageName = module.context.match(
                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                  )[1];
                  return `npm.${packageName.replace("@", "")}`;
                },
              }
            : {},
        },
      },
    },

    // generate source map
    devtool: !isProd && "source-map",
  };
};
