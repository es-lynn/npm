module.exports = {
  rootDir: '../../',
  roots: ['./runtimes/node'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': './runtimes/node/node_modules/ts-jest'
  }
}
