# Setup

`yarn setup`

# Running tests

`yarn test:node`
 - Runs all tests inside `node` runtime
 
 `PKG=eslynn-utils yarn test:node`
 - Runs tests only for the package `eslynn-utils`

# Publishing

create a branch named `next/<package-name>` and push

# Notes

# Commands

## Building

`yarn build:dist` - Build all packages

`yarn build:dist --scope @es-lynn/utils` - Build a single package

`yarn build:watch` - Build and watch all packages

`yarn build:watch --scope @es-lynn/utils` - Build and watch a single package



# TODO

~~- Setup CI properly~~
  ~~- Compile~~
  ~~- Lint~~
  ~~- Test~~
~~- [ ] Have a publishing process~~
- [ ] Setup React package & environment

## Low Priority

- Cache node_modules in CI
