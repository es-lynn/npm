import { FakerFactory } from '@es-lynn/devtools/dist/src/faker/FakerFactory'

import { Rand } from '../../packages/eslynn-utils'

const nameFactory = new FakerFactory(() => ({
  name: Rand.num(0, 99)
}))

console.log(nameFactory.new())
console.log(nameFactory.new())
console.log(nameFactory.new())
console.log(nameFactory.new())
console.log(nameFactory.new())
