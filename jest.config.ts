import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Enables TypeScript support
  testEnvironment: 'jsdom', // Simulates a browser environment
  setupFilesAfterEnv: ['./jest.setup.ts'], // Points to a setup file for extended matchers
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Handles CSS/SCSS imports
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // <- use your main config
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }], // Transforms TS/TSX files
    '^.+\\.(js|jsx)$': 'babel-jest', // Transforms JS/JSX files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js|jsx)$',
};

export default config;