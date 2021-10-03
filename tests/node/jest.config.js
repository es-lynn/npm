module.exports = {
  rootDir: '../../',
  roots: ['./tests/node'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': './tests/node/node_modules/ts-jest'
  }
}
