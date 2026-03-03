export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|eot|ttf|otf)$': '<rootDir>/__mocks__/fileMock.js'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-router|react-router-dom|@remix-run)/)'
  ],
  testMatch: [
    '<rootDir>/src/**/*.test.{js,jsx}',
    '<rootDir>/src/**/*.spec.{js,jsx}'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json']
};
