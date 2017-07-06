module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: ['node'],
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  rules: {
    'node/no-unsupported-features': 0,
    'node/exports-style': ['error', 'module.exports'],
    'no-console': 0,
    'comma-dangle': ['error', 'always-multiline'],
  },
  env: {
    node: true,
    browser: true,
  },
};
