export default {
   
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    moduleNameMapper: {
      '^.+\\.css$': 'identity-obj-proxy', // This should correctly map CSS imports
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    transformIgnorePatterns: [
      'node_modules/(?!(@testing-library|@vitejs|other-packages-to-transform)/)',
    ],
  };
  