import { Arr } from '../index'

describe('ArrayUtil', () => {
  test('first', async () => {
    const arr = ['a', 'b', 'c']
    expect(Arr.first(arr)).toEqual('a')
  })

  test('first on empty array', async () => {
    const arr: any = []
    expect(() => Arr.first(arr)).toThrowError()
  })

  test('last', async () => {
    const arr = ['a', 'b', 'c']
    expect(Arr.last(arr)).toEqual('c')
  })

  test('last on empty array', async () => {
    const arr: any = []
    expect(() => Arr.last(arr)).toThrowError()
  })

  test('is_not_empty', async () => {
    const arr = ['a', 'b', 'c']
    expect(Arr.isEmpty(arr)).toEqual(false)
  })

  test('is_empty', async () => {
    const arr: [] = []
    expect(Arr.isEmpty(arr)).toEqual(true)
  })

  test('max', async () => {
    const arr = [33, 64, -23]
    expect(Arr.max(arr)).toEqual(64)
  })

  test('random', async () => {
    const arr = ['a', 'b', 'c']
    expect(arr.includes(Arr.random(arr))).toBeTruthy()
  })

  describe('groupBy', () => {
    test('sample1', () => {
      const groupByLetter = Arr.groupBy(
        ['a', 'ab', 'b', 'bb', 'bc', 'cc'],
        it => it[0]
      )
      expect(groupByLetter).toEqual({
        a: ['a', 'ab'],
        b: ['b', 'bb', 'bc'],
        c: ['cc']
      })
    })

    test('sample2', () => {
      const groupByOddEven = Arr.groupBy([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], it =>
        it % 2 === 0 ? 'even' : 'odd'
      )
      expect(groupByOddEven).toEqual({
        even: [0, 2, 4, 6, 8],
        odd: [1, 3, 5, 7, 9]
      })
    })

    const berlin = { name: 'Berlin', sex: 'F' }
    const bob = { name: 'Bob', sex: 'M' }
    const alice = { name: 'Alice', sex: 'F' }
    const carol = { name: 'Carol', sex: 'F' }
    const dan = { name: 'Dan', sex: 'M' }
    const aiden = { name: 'Aiden', sex: 'NB' }
    const cheryl = { name: 'Cheryl', sex: 'F' }
    const ppl = [berlin, bob, alice, carol, dan, aiden, cheryl]

    test('sex', () => {
      const groupBySex = Arr.groupBy(ppl, it => it.sex)
      expect(groupBySex).toEqual({
        F: [berlin, alice, carol, cheryl],
        M: [bob, dan],
        NB: [aiden]
      })
    })

    test('letter', () => {
      const groupByLetter = Arr.groupBy(ppl, it => it.name[0])
      expect(groupByLetter).toEqual({
        A: [alice, aiden],
        B: [berlin, bob],
        C: [carol, cheryl],
        D: [dan]
      })
    })

    test('filtered', () => {
      const filtered = ppl.filter(it => it.sex === 'F')
      const groupByLetter = Arr.groupBy(filtered, it => it.name[0])
      expect(groupByLetter).toEqual({
        A: [alice],
        B: [berlin],
        C: [carol, cheryl]
      })
    })

    test('sort', () => {
      const sorted = ppl.slice().sort((a, b) => (a.name < b.name ? 1 : -1))
      const groupByLetter = Arr.groupBy(sorted, it => it.name[0])
      expect(groupByLetter).toEqual({
        A: [alice, aiden],
        B: [bob, berlin],
        C: [cheryl, carol],
        D: [dan]
      })
    })

    test('map', () => {
      const groupByLetterCount = Arr.groupBy(
        ppl.map(it => ({
          ...it,
          letterCount: it.name.length
        })),
        it => it.letterCount
      )
      function wrap<T extends { name: string }>(
        object: T
      ): T & { letterCount: number } {
        return {
          ...object,
          letterCount: object.name.length
        }
      }
      expect(groupByLetterCount).toEqual({
        3: [wrap(bob), wrap(dan)],
        5: [wrap(alice), wrap(carol), wrap(aiden)],
        6: [wrap(berlin), wrap(cheryl)]
      })
    })
  })

  describe('unique', () => {
    test('numbers', () => {
      const arr = [1, 2, 3, 2, 3, 1, 2, 3, 2, 1]
      const unique = Arr.unique(arr)
      expect(unique.length).toEqual(3)
      expect(unique).toEqual([1, 2, 3])
    })
    test('strings', () => {
      const arr = ['julie', 'jaslyn', 'julie', 'jamie', 'jamie', 'jessica']
      const unique = Arr.unique(arr)
      expect(unique.length).toEqual(4)
      expect(unique).toEqual(['julie', 'jaslyn', 'jamie', 'jessica'])
    })
    test('objects', () => {
      const arr: { id: number; random: string }[] = [
        { id: 1, random: 'abc' },
        { id: 2, random: 'def' },
        { id: 3, random: 'ghi' },
        { id: 4, random: 'jkl' },
        { id: 1, random: 'mno' },
        { id: 3, random: 'pqr' }
      ]
      const unique = Arr.unique(arr, it => it.id)
      expect(unique.length).toEqual(4)
      expect(unique).toEqual([
        { id: 1, random: 'abc' },
        { id: 2, random: 'def' },
        { id: 3, random: 'ghi' },
        { id: 4, random: 'jkl' }
      ])
    })
  })
})
