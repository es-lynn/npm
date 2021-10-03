import { Obj } from '../index'

describe('ObjectUtil', () => {
  describe('pick', () => {
    const object = { a: 'a', b: 2, c: true }

    test('pick 1 key', () => {
      const picked = Obj.pick(object, 'a')
      expect(picked).toEqual({ a: 'a' })
    })

    test('pick 2 keys', () => {
      const picked = Obj.pick(object, ['a', 'b'])
      expect(picked).toEqual({
        a: 'a',
        b: 2
      })
    })
  })

  describe('omit', () => {
    const object = { a: 'a', b: 2, c: true }

    test('omit 1 key', () => {
      const picked = Obj.omit(object, 'c')
      expect(picked).toEqual({
        a: 'a',
        b: 2
      })
    })

    test('omit 2 keys', () => {
      const picked = Obj.omit(object, ['b', 'c'])
      expect(picked).toEqual({
        a: 'a'
      })
    })
  })
})
