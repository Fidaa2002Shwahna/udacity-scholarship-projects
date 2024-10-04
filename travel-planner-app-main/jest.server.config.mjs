/**
 * @type {import('jest').Config}
 */
const config = {
  transform: {
    "^.+\\.js$": "babel-jest",
  },

  testEnvironment: process.env.TEST_ENV === 'node' ? 'node' : 'jsdom',

  testMatch: [
    "**/__test__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  clearMocks: true,
  coverageDirectory: "coverage",
  transformIgnorePatterns: [
    "\\\\node_modules\\\\",
  ],

  setupFiles: ['<rootDir>/jest.setup.js'],
};

export default config;
