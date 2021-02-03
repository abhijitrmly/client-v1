// In .babelrc.js
module.exports = {
  presets: [['next/babel', { 'preset-react': { runtime: 'automatic' } }]],
  plugins: ['@emotion/babel-plugin', 'babel-plugin-macros', '@babel/plugin-syntax-jsx', ['styled-components', { ssr: true }]],
};
