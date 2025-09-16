module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/src/js/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};