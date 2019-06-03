/**
 * Dist configuration. Used to build the
 * final output when running npm run dist.
 */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const WebpackBaseConfig = require('./Base');

const ROOT = path.resolve(__dirname, '../..');

function root(args) {
  // eslint-disable-next-line prefer-rest-params
  args = Array.prototype.slice.call(arguments, 0);
  return path.join(...[ROOT].concat(args));
}

class WebpackDistConfig extends WebpackBaseConfig {
  constructor() {
    super();
    this.isDev = false;
    this.config = {
      mode: 'production',
      cache: false,
      // devtool: 'source-map',
      entry: ['@babel/polyfill', './index.js'],
      output: {
        path: root('dist'),
        publicPath: '',
        pathinfo: false,
        filename: 'assets/app.js',
        chunkFilename: 'assets/[id].[hash:8].js',
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info => path.relative('src', info.absoluteResourcePath).replace(/\\/g, '/'),
      },

      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"',
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.prod.html',
          BUILD_VERSION: process.env.BUILD_VERSION,
          minify: {
            removeComments: true,
          },
          hash: true,
        }),
        new CopyWebpackPlugin([
          {
            from: root('public'),
            to: root('dist'),
          },
          {
            from: root('src/assets/images'),
            to: root('dist/assets/images'),
          },
        ]),
        new MiniCssExtractPlugin({
          filename: 'assets/[name].css',
          chunkFilename: 'assets/[id].css',
        }),
      ],
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            parallel: true,
            sourceMap: false,
          }),
          new OptimizeCSSAssetsPlugin(),
        ],
      },
    };

    // Deactivate hot-reloading if we run dist build on the dev server
    this.config.devServer.hot = false;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dist';
  }
}

module.exports = WebpackDistConfig;
