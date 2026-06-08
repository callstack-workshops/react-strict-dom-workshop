//@ts-check
const { composePlugins, withNx } = require('@nx/next');
const babelLoader = require('./babelLoader.config.js');

const webOnlyExtensions = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx'];

function getBabelLoader() {
  return { loader: 'babel-loader', options: babelLoader };
}

function shouldExclude(resource) {
  if (!/node_modules/.test(resource)) return false;
  return !/node_modules[\/\\](react-strict-dom|@ui|@core|@feature|@screen)/.test(resource);
}

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} */
const nextConfig = {
  nx: {},
  transpilePackages: ['react-strict-dom', '@ui/components'],
  webpack: (config) => {
    const baseConditions =
      config.resolve.conditionNames && config.resolve.conditionNames.length
        ? config.resolve.conditionNames
        : ['browser', 'module', 'import', 'require', 'node', 'default'];
    config.resolve.conditionNames = ['@workshop/source', ...baseConditions];

    config.resolve.extensions = [
      ...webOnlyExtensions,
      ...config.resolve.extensions,
    ];

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };

    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: shouldExclude,
      use: [getBabelLoader()],
    });

    return config;
  },
};

module.exports = composePlugins(withNx)(nextConfig);
