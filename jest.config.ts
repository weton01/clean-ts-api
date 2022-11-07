export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  clearMocks: true,
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
