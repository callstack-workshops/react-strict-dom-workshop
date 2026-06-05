module.exports = {
  plugins: [
    require('react-strict-dom/postcss-plugin')({
      include: [
        'App.tsx',
        'src/**/*.{js,jsx,ts,tsx}'
      ]
    }),
    require('autoprefixer')
  ]
};