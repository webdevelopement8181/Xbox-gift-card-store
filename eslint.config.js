export default {
  env: {
    browser: true, // Enables browser global variables like `window` and `document`
    es2021: true,  // Enables modern ES features
  },
  extends: [
    'eslint:recommended', // Use recommended ESLint rules
    'plugin:react/recommended', // Use recommended rules for React
    'plugin:@typescript-eslint/recommended', // Use recommended rules for TypeScript (if you're using TypeScript)
    'plugin:prettier/recommended', // Integrates Prettier with ESLint to avoid conflicts
  ],
  parserOptions: {
    ecmaVersion: 2021, // Use modern ECMAScript syntax
    sourceType: 'module', // Allows the use of imports
    ecmaFeatures: {
      jsx: true, // Enable JSX syntax
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the version of React to use the correct rules
    },
  },
  plugins: ['react', '@typescript-eslint', 'prettier'], // Plugins for React, TypeScript, and Prettier
  rules: {
    'prettier/prettier': 'error', // Treat Prettier issues as errors
    'react/prop-types': 'off', // Disable prop-types rule if using TypeScript
    '@typescript-eslint/no-unused-vars': ['error'], // Prevent unused variables
    // Add or customize other rules here
  },
  ignorePatterns: ['dist/', 'node_modules/'], // Ignore these folders
};
