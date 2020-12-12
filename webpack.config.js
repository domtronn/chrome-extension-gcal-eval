const path = require("path")

const BuildNotifierPlugin = require("webpack-build-notifier")

module.exports = {
  mode: "development",
  devtool: "inline-source-map",

  entry: {
    content: "./src/app/content.js",
    background: "./src/app/background.ts",
    popup: "./src/ui/popup.jsx",
    options: "./src/ui/options.jsx",
  },

  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "[name].js",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  plugins: [
    new BuildNotifierPlugin({
      title: "Google Calendar evaluator built",
    }),
  ],

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },

  watch: !!process.env.WATCH,
}
