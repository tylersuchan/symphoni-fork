module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: { jquery: true, es6: true, browser: true, commonjs: true },
  rules: {
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'linebreak-style': 0,
  },
};
