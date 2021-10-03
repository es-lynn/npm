import { Rand } from '../index'

describe('RandomUtil', () => {
  test('random', () => {
    const results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < 100000; i++) {
      const num = Rand.num(0, 9)
      results[num] = results[num] + 1
    }
    for (let i = 0; i < 10; i++) {
      expect(results[i]).toBeGreaterThan(9000)
      expect(results[i]).toBeLessThan(11000)
    }
  })

  test('maybe', () => {
    const attempts = 100000
    let resultTrue = 0
    for (let i = 0; i < attempts; i++) {
      if (Rand.maybe()) {
        resultTrue = ++resultTrue
      }
    }
    expect(resultTrue).toBeGreaterThan(49000)
    expect(resultTrue).toBeLessThan(51000)
  })

  describe('chance', () => {
    test('0%', () => {
      for (let i = 0; i < 1000; i++) {
        expect(Rand.chance(0)).toBeFalsy()
      }
    })
    test('100%', () => {
      for (let i = 0; i < 1000; i++) {
        expect(Rand.chance(100)).toBeTruthy()
      }
    })

    test('1%', () => {
      let result = 0
      for (let i = 0; i < 10000; i++) {
        if (Rand.chance(1)) {
          result = ++result
        }
      }
      expect(result).toBeGreaterThan(50)
      expect(result).toBeLessThan(150)
    })

    test('99%', () => {
      let result = 0
      for (let i = 0; i < 10000; i++) {
        if (Rand.chance(99)) {
          result = ++result
        }
      }
      expect(result).toBeGreaterThan(9850)
      expect(result).toBeLessThan(9950)
    })
  })
})
