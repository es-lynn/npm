import { Datee, Time } from '../index'

describe('Time', () => {
  test('until', () => {
    const today = Datee.now()
    const tomorrow = Datee.add(Time.days(1), today)
    const yesterday = Datee.minus(Time.days(1), today)
    expect(Time.until(tomorrow)).toBeCloseTo(Time.days(1), -1)
    expect(Time.until(today)).toBeCloseTo(0, -1)
    expect(Time.until(yesterday)).toBeCloseTo(Time.days(-1), -1)
  })

  test('since', () => {
    const today = Datee.now()
    const tomorrow = Datee.add(Time.days(1), today)
    const yesterday = Datee.minus(Time.days(1), today)
    expect(Time.since(tomorrow)).toBeCloseTo(Time.days(-1), -1)
    expect(Time.since(today)).toBeCloseTo(0, -1)
    expect(Time.since(yesterday)).toBeCloseTo(Time.days(1), -1)
  })

  test('seconds', () => {
    expect(Time.secs(1)).toEqual(1000)
  })
  test('minutes', () => {
    expect(Time.mins(1) + Time.secs(1)).toEqual(61000)
  })
  test('hours', () => {
    expect(Time.hours(1) + Time.mins(1) + Time.secs(1)).toEqual(3661000)
  })
  test('days', () => {
    expect(Time.days(1) + Time.hours(1) + Time.mins(1) + Time.secs(1)).toEqual(
      90061000
    )
  })

  describe('from', () => {
    test('seconds', () => {
      expect(
        Time.parse({ years: 0, days: 0, hours: 0, mins: 0, secs: 1 })
      ).toEqual(1000)
    })
    test('minutes', () => {
      expect(
        Time.parse({ years: 0, days: 0, hours: 0, mins: 1, secs: 1 })
      ).toEqual(61000)
    })
    test('hours', () => {
      expect(
        Time.parse({ years: 0, days: 0, hours: 1, mins: 1, secs: 1 })
      ).toEqual(3661000)
    })
    test('days', () => {
      expect(
        Time.parse({ years: 0, days: 1, hours: 1, mins: 1, secs: 1 })
      ).toEqual(90061000)
    })
  })

  describe('format', () => {
    test('minutes', () => {
      expect(Time._duration(86400000 + 3600000 + 60000 + 1000)).toEqual({
        years: 0,
        days: 1,
        hours: 1,
        mins: 1,
        secs: 1
      })
    })
  })
})
