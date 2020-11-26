module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'no-plusplus': 0,
    'no-constant-condition': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-console': 0,
    'no-implicit-globals': 0,
    // 'no-unused-expressions': 0,
  },
};