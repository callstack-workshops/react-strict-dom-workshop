const dev = process.env.NODE_ENV !== 'production';

/** @type {import('@babel/core').TransformOptions} */
const config = {
  parserOpts: {
    plugins: ['typescript', 'jsx'],
  },
  presets: [
    [
      'react-strict-dom/babel-preset',
      {
        debug: dev,
        dev,
        platform: 'web',
        rootDir: require('path').resolve(__dirname, '../..'),
      },
    ],
  ],
};

module.exports = config;
