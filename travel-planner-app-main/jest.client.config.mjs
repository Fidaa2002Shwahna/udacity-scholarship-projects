/**
 * @type {import('jest').Config}
 */
const config = {

    transform: {
      "^.+\\.js$": "babel-jest",
    },
  

    testEnvironment: 'jsdom',

    testMatch: [
      "**/__test__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
  
    clearMocks: true,
  
    coverageDirectory: "coverage/client",

    transformIgnorePatterns: [
      "\\\\node_modules\\\\",
    ],
  
    setupFiles: ['<rootDir>/jest.setup.js'],
  };
  
  export default config;
  