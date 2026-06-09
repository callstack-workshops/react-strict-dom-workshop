const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

/** @type {import('@react-native/metro-config').MetroConfig} */
const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    unstable_enablePackageExports: true,
    unstable_conditionNames: ['react-native', '@workshop/source', 'require'],
    // Metro does not rewrite TypeScript NodeNext ".js" specifiers (which point at
    // .ts/.tsx source). On a failed resolution, retry with the extension stripped.
    resolveRequest: (context, moduleName, platform) => {
      try {
        return context.resolveRequest(context, moduleName, platform);
      } catch (error) {
        if (moduleName.startsWith('.') && moduleName.endsWith('.js')) {
          return context.resolveRequest(context, moduleName.slice(0, -3), platform);
        }
        throw error;
      }
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
