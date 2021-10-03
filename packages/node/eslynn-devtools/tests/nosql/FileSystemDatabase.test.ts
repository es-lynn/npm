import Faker from 'faker'
import { FakerFactory } from '../../src/faker/FakerFactory'
import { FileSystemDatabase } from '../../src/nosql/FileSystemDatabase'
import {Rand} from "@es-lynn/utils";

const DataFactory = new FakerFactory((): Data => {
  return {
    id: Faker.random.uuid(),
    array: [],
    boolean: Rand.maybe(),
    string: Faker.random.word(),
    number: Rand.num(0, 10),
    object: {
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName()
    },
    date: Faker.date.recent()
  }
})
type Data = {
  id: string
  boolean: boolean
  number: number
  string: string
  array: string[]
  object: {
    firstName: string
    lastName: string
  }
  date: Date
}

describe('FileSystemDatabase', () => {
  const DB = new FileSystemDatabase<Data>('TestDatabase')

  test('Select', async () => {
    await DB.deleteAll()
    const data = DataFactory.new({ id: 'one' })
    await expect(DB.select('one')).rejects.toThrow()
    await DB.insert(data)
    const result = await DB.select('one')

    expect(result).not.toBeUndefined()
    expect(result.id).toEqual('one')
    expect(result).toEqual(data)
  })

  test('Scan with 0 items', async () => {
    await DB.deleteAll()
    const result = await DB.scan()
    expect(result.length).toEqual(0)
  })

  test('Insert 3 items > Scan', async () => {
    await DB.deleteAll()
    const data = DataFactory.new({ id: 'one' })
    const data2 = DataFactory.new({ id: 'two' })
    const data3 = DataFactory.new({ id: 'three' })
    await DB.insert(data)
    await DB.insert(data2)
    await DB.insert(data3)
    const result = await DB.scan()
    expect(result.length).toEqual(3)
    expect(result.find(it => it.id === 'one')).toEqual(data)
    expect(result.find(it => it.id === 'two')).toEqual(data2)
    expect(result.find(it => it.id === 'three')).toEqual(data3)
  })

  test('Update', async () => {
    await DB.deleteAll()
    const date = new Date()
    await DB.insert({
      id: 'one',
      array: [],
      boolean: false,
      number: 0,
      object: { firstName: 'Mandy', lastName: 'Tan' },
      string: 'first',
      date: date
    })

    await DB.update({
      id: 'one',
      number: 3
    })
    const result = await DB.select('one')
    expect(result).toEqual({
      id: 'one',
      array: [],
      boolean: false,
      number: 3,
      object: { firstName: 'Mandy', lastName: 'Tan' },
      string: 'first',
      date: date
    })
  })

  describe('Delete', () => {
    beforeAll(async () => {
      await DB.deleteAll()
      await DB.insert(DataFactory.new({ id: 'one' }))
      await DB.insert(DataFactory.new({ id: 'two' }))
      await DB.insert(DataFactory.fixture('three', { id: 'three' }))
    })

    test('should have 3 items', async () => {
      expect((await DB.scan()).length).toEqual(3)
    })

    test('delete non-existent object, 3 remaining', async () => {
      await DB.delete('four')
      expect((await DB.scan()).length).toEqual(3)
    })

    test('delete 1st object, 2 remaining', async () => {
      await DB.delete('one')
      expect((await DB.scan()).length).toEqual(2)
    })

    test('delete 2nd object, 1 remaining', async () => {
      await DB.delete('two')
      expect((await DB.scan()).length).toEqual(1)
    })

    test('cannot select deleted object', async () => {
      await expect(DB.select('one')).rejects.toThrow()
      await expect(DB.select('two')).rejects.toThrow()
    })

    test('select last object === three', async () => {
      expect(await DB.select('three')).toEqual(DataFactory.fixture('three'))
    })

    test('scan last object === three', async () => {
      expect((await DB.scan())[0]).toEqual(DataFactory.fixture('three'))
    })

    test('delete 3rd object, no items remaining', async () => {
      await DB.delete('three')
      expect((await DB.scan()).length).toEqual(0)
    })
  })

  describe('Date Parsing', () => {
    beforeAll(async () => {
      await DB.deleteAll()
    })
    test('should parse ISOString as date', async () => {
      const data = DataFactory.new({ id: 'one' })
      await DB.insert(data)
      const result = await DB.select('one')
      expect(data).toEqual(result)
      expect(result.date).toBeInstanceOf(Date)
      expect(data.date).toStrictEqual(result.date)
    })
  })
})
