import babelLoader from './babelLoader.config.mjs';

const config = {
  plugins: {
    'react-strict-dom/postcss-plugin': {
      include: [
        // Be specific. A broad glob like '**/*' that reaches node_modules
        // causes major build-perf problems.
        'src/**/*.{js,jsx,mjs,ts,tsx}',
      ],
      babelConfig: babelLoader,
      useLayers: true,
    },
  },
};

export default config;
