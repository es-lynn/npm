import { myFunction } from '../src/Function'

describe('Function', () => {
  it('should return hello world', () => {
    expect(myFunction()).toEqual('hello world')
  })
})
