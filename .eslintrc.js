// http://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: 'airbnb-base',
  // required to lint *.vue files
  // check if imports actually resolve
  // add your custom rules here
  "rules": {
    'no-param-reassign': ['error', { props: false }],
    'consistent-return': 0,
    'no-unused-expressions': ['error', { allowTernary: true }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow console during development
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
};
