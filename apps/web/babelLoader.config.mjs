const dev = process.env.NODE_ENV !== 'production';

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
        rootDir: process.cwd(),
      },
    ],
  ],
};

export default config;
