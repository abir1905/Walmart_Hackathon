const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    vm: require.resolve("vm-browserify"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer/"),
    process: require.resolve("process/browser.js") // ← Add `.js`
  };

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser.js' // ← Add `.js`
    }),
  ];

  return config;
};
