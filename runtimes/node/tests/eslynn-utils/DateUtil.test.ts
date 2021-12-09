import { Datee, Time } from '@es-lynn/utils'

describe('DateUtil', () => {
  test('to_date', async () => {
    const date = new Date(1576598796000)
    expect(Datee.parse(date)).toEqual(date)
    expect(Datee.parse(1576598796000)).toEqual(date)
    expect(Datee.parse(1576598796)).toEqual(date)
    expect(Datee.parse(1576598795)).not.toEqual(date)
    expect(Datee.parse('1576598796000')).toEqual(date)
    expect(Datee.parse('1576598796')).toEqual(date)
    expect(Datee.parse('1576598795')).not.toEqual(date)
    expect(Datee.parse()).toBeInstanceOf(Date)
    // FIXME: expect(Datee.to_date()).toEqual(new Date())
  })

  test('iso_string_to_date', () => {
    const date = new Date('2020-07-20T18:01:46.000Z')
    expect(Datee.parse('2020-07-20T18:01:46.000Z')).toEqual(date)
  })

  test('invalid to_date', async () => {
    expect(() => Datee.parse('abc')).toThrow(TypeError)
    expect(() => Datee.parse('123a')).toThrow(TypeError)
    expect(() => Datee.parse(null as any)).toThrow(TypeError)
    expect(() => Datee.parse(true as any)).toThrow(TypeError)
  })

  test('utc/epoch', async () => {
    const date = new Date(1576598796987)
    expect(Datee.utc(date)).toEqual(1576598796987)
    expect(Datee.epoch(date)).toEqual(1576598796)
  })

  test('add/elapsed', async () => {
    const today = Datee.now()
    const tomorrow = Datee.add(Time.days(1), today)
    const yesterday = Datee.minus(Time.days(1), today)
    expect(Time.elapsed(yesterday, tomorrow)).toEqual(Time.days(2))
    expect(Time.elapsed(today, tomorrow)).toEqual(Time.days(1))
    expect(Time.elapsed(today, today)).toEqual(0)
    expect(Time.elapsed(tomorrow, today)).toEqual(Time.days(-1))
    expect(Time.elapsed(tomorrow, yesterday)).toEqual(Time.days(-2))
  })

  test('before', async () => {
    const date = Datee.now()
    const date2 = Datee.add(1, date)
    expect(Datee.isBefore(date, date)).toBeTruthy()
    expect(Datee.isBefore(date, date2)).toBeTruthy()
    expect(Datee.isBefore(date2, date)).not.toBeTruthy()
  })

  test('before now()', async () => {
    const date = Datee.now()
    expect(Datee.isBefore(date, Datee.now())).toBeTruthy()
  })

  test('after', async () => {
    const date = Datee.now()
    const date2 = Datee.add(1, date)
    expect(Datee.isAfter(date, date2)).not.toBeTruthy()
    expect(Datee.isAfter(date2, date)).toBeTruthy()
  })

  test('after now()', async () => {
    const date = Datee.add(99999)
    expect(Datee.isAfter(date, Datee.now())).toBeTruthy()
  })

  test('isPast', async () => {
    const today = new Date()
    const tomorrow = Datee.add(Time.days(1), today)
    const yesterday = Datee.minus(Time.days(1), today)
    expect(Datee.isPast(yesterday)).toBeTruthy()
    expect(Datee.isPast(tomorrow)).toBeFalsy()
  })

  test('isFuture', async () => {
    const today = new Date()
    const tomorrow = Datee.add(Time.days(1), today)
    const yesterday = Datee.minus(Time.days(1), today)
    expect(Datee.isFuture(tomorrow)).toBeTruthy()
    expect(Datee.isFuture(yesterday)).toBeFalsy()
  })
})
