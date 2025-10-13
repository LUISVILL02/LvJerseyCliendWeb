import type { Config } from 'jest';

export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/src/**/*.+(spec|test).+(ts|js)',
  ], 
  transformIgnorePatterns: [
    'node_modules/(?!(@angular|@fortawesome|xlsx-file-parser-light)/)'
  ],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@src/(.*)': '<rootDir>/src/$1',
    '@services/(.*)': '<rootDir>/src/app/core/services/$1',
    '@helpers/(.*)': '<rootDir>/src/app/helpers/$1',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.spec.ts',
    '!src/app/**/*.module.ts',
    '!src/app/**/index.ts',
    '!<rootDir>/node_modules/',
    '!<rootDir>/test/',
  ],
} satisfies Config;
