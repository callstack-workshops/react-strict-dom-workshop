const reactStrictPreset = require('react-strict-dom/babel-preset');

module.exports = function (api) {
  const dev = api.caller((caller) => Boolean(caller && caller.dev));
  return {
    presets: [
      '@react-native/babel-preset',
      [reactStrictPreset, { debug: dev, dev, platform: 'native' }],
    ],
  };
};
