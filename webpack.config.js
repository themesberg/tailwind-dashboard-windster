const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");
const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/app.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'static/'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'static/images/'
        }
      },
      {
        test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'file-loader',
        }]
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        parallel: true,

        terserOptions: {
          safari10: true,
          toplevel: true,
          mangle: true,
          compress: {
            passes: 2,
            arguments: true,
            keep_fargs: false,
            booleans_as_integers: true
          },
        }
      }),
      new CssMinimizerPlugin()
    ]
  },
};