/* eslint strict: 0, no-shadow: 0, no-unused-vars: 0, no-console: 0 */
'use strict';

const webpack = require('webpack');
import electronCfg from './webpack.config.electron.js';
import cfg from './webpack.config.production.js';
import del from 'del';

startPack();

function build(cfg) {
  return new Promise((resolve, reject) => {
    webpack(cfg, (err, stats) => {
      if (err) return reject(err);
      resolve(stats);
    });
  });
}

function startPack() {
  console.log('start pack...');
  del('build')
    .then(() => build(electronCfg))
    .then(() => build(cfg))
    .catch((error) => {
      console.log(error)
    })
    .then((result) => {
      console.log(result)
      console.log("Done packing")
    })
}
