import webpack from 'webpack';
import baseConfig from './webpack.config.base';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
  ...baseConfig,

  mode: 'production',

  devtool: 'source-map',

  entry: './app/app',

  output: {
    ...baseConfig.output,

    publicPath: '../build/'
  },

  module: {
    ...baseConfig.module,

    rules: [
      ...baseConfig.module.rules,

      {
        test: /\.global\.css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },

      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      }
      // {
      //   test: /^((?!\.global).)*\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader'
      //   ]
      // },
      // {
      //   test: /\.global\.css$/,
      //   use: [
      //     {loader: 'style-loader'},
      //     {loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'}
      //   ]
      // },
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // }),
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html'},
      { from: './app/glitch.png', to: 'glitch.png'},
      { from: './app/icons/icon.*', to: '../dist-assets/[name].[ext]'}
    ], {})
  ],

  target: 'electron-renderer'
};
