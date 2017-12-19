const webpack = require('webpack');

require('dotenv').config();
module.exports = {
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.BLOGGER_URL': JSON.stringify(process.env.BLOGGER_URL),
        'process.env.API_KEY': JSON.stringify(process.env.API_KEY),        
      })
    );
    return config;
  }
};