# Setup

`yarn setup`

# Running tests

`yarn test:node`
 - Runs all tests inside `node` runtime
 
 `PKG=eslynn-utils yarn test:node`
 - Runs tests only for the package `eslynn-utils`

# Publishing

1. npm login
2. cd packages/<package>
3. update version (0.0.0-next.0)
4. npm publish --access public --tag next


# TODO

~~- Setup CI properly~~
  ~~- Compile~~
  ~~- Lint~~
  ~~- Test~~
- [ ] Have a publishing process
- [ ] Setup React package & environment

## Low Priority

- Cache node_modules in CI
