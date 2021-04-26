const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const moment = require('moment');

module.exports = {
  target: 'node',
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new ESLintPlugin({
      fix: true,
      formatter: 'table'
    }),
    new webpack.BannerPlugin({
      banner: () => {
        const version = process.env.npm_package_version;
        const author = process.env.npm_package_author_name;
        const dateAndTime = moment().format('DD/MM/YYYY HH:mm:ss')
        return `🔌 Shelly-Hub v${version}\n\n🤙 Author: ${author}\n\n🏷 Hash: [fullhash]\n⏱ Released on: ${dateAndTime}`
      },
      entryOnly: true
    })
  ],
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  optimization: {
    minimize: true,
    nodeEnv: 'production',
  },
  performance: {
    hints: false,
  },
  watch: false,
  mode: 'production'
};