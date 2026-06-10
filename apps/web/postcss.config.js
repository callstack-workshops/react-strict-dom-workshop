const babelLoader = require('./babelLoader.config.js');

module.exports = {
  plugins: {
    'react-strict-dom/postcss-plugin': {
      include: [
        'app/**/*.{js,jsx,mjs,ts,tsx}',
        '../../packages/ui/components/src/**/*.{js,jsx,mjs,ts,tsx}',
        '../../packages/ui/tokens/src/**/*.{js,jsx,mjs,ts,tsx}',
      ],
      babelConfig: babelLoader,
      useLayers: true,
    },
  },
};
