import type { NextConfig } from "next";
import babelLoader from "./babelLoader.config.mjs";

const webOnlyExtensions = [".web.js", ".web.jsx", ".web.ts", ".web.tsx"];

function getBabelLoader() {
  return {
    loader: "babel-loader",
    options: babelLoader,
  };
}

const nextConfig: NextConfig = {
  transpilePackages: ["react-strict-dom"],

  turbopack: {
    rules: {
      "*.{js,jsx,ts,tsx}": {
        loaders: [getBabelLoader()],
      },
    },
    resolveExtensions: [
      ...webOnlyExtensions,
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".mjs",
      ".json",
    ],
  },

  webpack: (config) => {
    config.resolve.mainFields = ["module", "main"];
    config.resolve.extensions = [
      ...webOnlyExtensions,
      ...config.resolve.extensions,
    ];
    config.module.rules.push({
      exclude: /node_modules(?!\/react-strict-dom)/,
      test: /\.(js|jsx|ts|tsx)$/,
      use: [getBabelLoader()],
    });
    return config;
  },
};

export default nextConfig;
