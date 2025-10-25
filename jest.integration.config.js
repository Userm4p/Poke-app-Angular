module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapping: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/app/**/*.{ts,js}',
    '!src/app/**/*.spec.{ts,js}',
    '!src/app/**/*.test.{ts,js}',
    '!src/app/**/*.module.{ts,js}',
    '!src/app/**/index.{ts,js}',
    '!src/app/**/*.interface.{ts,js}',
    '!src/app/**/*.type.{ts,js}',
    '!src/app/**/*.enum.{ts,js}',
    '!src/app/**/*.constant.{ts,js}',
    '!src/app/**/*.config.{ts,js}',
    '!src/app/**/*.stub.{ts,js}',
    '!src/app/**/*.mock.{ts,js}',
  ],
  coverageDirectory: 'coverage/integration',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '<rootDir>/src/app/integration/**/*.spec.ts',
    '<rootDir>/src/app/integration/**/*.test.ts',
  ],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: 'tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|@angular|@ngrx|rxjs)',
  ],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  testTimeout: 10000,
};
