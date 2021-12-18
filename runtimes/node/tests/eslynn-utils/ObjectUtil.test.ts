import { Obj } from '@es-lynn/utils'

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

  describe('toArray', () => {
    it('should map a simple object to an array', () => {
      const obj = {
        citizenship: 1,
        age: 3,
        gender: 2
      }
      const mappedArray = Obj.mapToArray(obj, (k, v) => ({
        id: k,
        weight: v
      }))
      expect(mappedArray).not.toEqual({})
      expect(mappedArray).toEqual([
        { id: 'citizenship', weight: 1 },
        { id: 'age', weight: 3 },
        { id: 'gender', weight: 2 }
      ])
    })
    it('should map a complex object to an array', () => {
      const obj = {
        SGP: { name: 'Singapore', population: 5000000, cities: ['Singapore'] },
        MYS: {
          name: 'Malaysia',
          population: 26000000,
          cities: ['Johor', 'KL', 'Penang']
        },
        THA: {
          name: 'Thailand',
          population: 62000000,
          cities: ['Bangkok', 'Phuket']
        }
      }
      const mappedArray = Obj.mapToArray(obj, (countryCode, country) => ({
        country: country.name,
        code: countryCode,
        population: country.population,
        cities: country.cities
      }))
      expect(mappedArray).toEqual([
        {
          country: 'Singapore',
          code: 'SGP',
          population: 5000000,
          cities: ['Singapore']
        },
        {
          country: 'Malaysia',
          code: 'MYS',
          population: 26000000,
          cities: ['Johor', 'KL', 'Penang']
        },
        {
          country: 'Thailand',
          code: 'THA',
          population: 62000000,
          cities: ['Bangkok', 'Phuket']
        }
      ])
    })
  })
})
