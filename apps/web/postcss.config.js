const babelLoader = require('./babelLoader.config.js');

module.exports = {
  plugins: {
    'react-strict-dom/postcss-plugin': {
      include: [
        'app/**/*.{js,jsx,mjs,ts,tsx}',
        '../../packages/core/core/src/**/*.{js,jsx,mjs,ts,tsx}',
        '../../packages/core/i18n/src/**/*.{js,jsx,mjs,ts,tsx}',
        '../../packages/ui/tokens/src/**/*.{js,jsx,mjs,ts,tsx}',
        '../../packages/ui/components/src/**/*.{js,jsx,mjs,ts,tsx}',
        '../../packages/feature/booking/src/**/*.{js,jsx,mjs,ts,tsx}',
        '../../packages/screen/booking/src/**/*.{js,jsx,mjs,ts,tsx}',
      ],
      babelConfig: babelLoader,
      useLayers: true,
    },
  },
};
