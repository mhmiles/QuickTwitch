import webpack from 'webpack';
import baseConfig from './webpack.config.base';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

export default {
  ...baseConfig,

  mode: 'production',
  devtool: 'source-map',

  entry: './app/main',

  output: {
    ...baseConfig.output,
    path: __dirname,
    filename: './build/main.js'
  },

  plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    }),
    // new webpack.BannerPlugin({
    //   banner: 'require(\'source-map-support\').install();',
    //   raw: true,
    //   entryOnly: false
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  target: 'electron-main',

  node: {
    __dirname: false,
    __filename: false
  },

  externals: [
    ...baseConfig.externals,
    'source-map-support'
  ]
};
