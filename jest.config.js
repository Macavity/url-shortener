module.exports = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(swagger-client|react-syntax-highlighter)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!<rootDir>/src/plugins/*.ts',
    '!<rootDir>/src/**/*.module.ts',
    // Intentionally skipping main, because Jest has issues with Swagger
    // Similar issue: https://github.com/nodejs/undici/issues/1235
    '!<rootDir>/src/main.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
