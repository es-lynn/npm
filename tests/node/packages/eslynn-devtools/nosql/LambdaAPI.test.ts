import Faker from 'faker'

import { matchCORS } from '../../../../../packages/eslynn-devtools'

describe('Match CORS', () => {
  test('*', () => {
    const origin = Faker.random.word()
    expect(matchCORS(origin, { whitelist: ['*'] })).toEqual(origin)
  })

  test('Empty whitelist', () => {
    const origin = Faker.random.word()
    expect(matchCORS(origin, { whitelist: [] })).toEqual(' Denied')
  })

  test('Origin in whitelist', () => {
    expect(matchCORS('origin', { whitelist: ['origin'] })).toEqual('origin')
  })

  test('Origin not in whitelist', () => {
    expect(matchCORS('origin', { whitelist: ['origina'] })).toEqual(' Denied')
  })
})
