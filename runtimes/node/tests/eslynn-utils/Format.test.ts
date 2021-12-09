import { Format, Time } from '../../../../packages/eslynn-utils'

describe('Format', () => {
  let consoleWarn: any
  beforeEach(() => {
    consoleWarn = jest.spyOn(console, 'warn')
  })

  describe('Email', () => {
    test('Email', () => {
      expect(Format.email('AbC@xYz.cOm')).toEqual('abc@xyz.com')
    })
    test('Invalid Email', () => {
      expect(Format.email(123 as any)).toEqual('ERR')
      expect(consoleWarn).toBeCalled()
    })
  })

  describe('timeAgo', () => {
    test('seconds', () => {
      expect(Format.timeAgo(0)).toEqual('0 seconds')
      expect(Format.timeAgo(Time.secs(1))).toEqual('1 seconds')
      expect(Format.timeAgo(Time.secs(59))).toEqual('59 seconds')
      expect(Format.timeAgo(Time.secs(60))).not.toEqual('59 seconds')
    })
    test('minutes', () => {
      expect(Format.timeAgo(Time.secs(60))).toEqual('1 minutes')
      expect(Format.timeAgo(Time.mins(1))).toEqual('1 minutes')
      expect(Format.timeAgo(Time.mins(59))).toEqual('59 minutes')
      expect(Format.timeAgo(Time.mins(60))).not.toEqual('60 minutes')
    })
    test('hours', () => {
      expect(Format.timeAgo(Time.mins(60))).toEqual('1 hours')
      expect(Format.timeAgo(Time.hours(1))).toEqual('1 hours')
      expect(Format.timeAgo(Time.hours(23))).toEqual('23 hours')
      expect(Format.timeAgo(Time.hours(24))).not.toEqual('24 hours')
    })
    test('days', () => {
      expect(Format.timeAgo(Time.hours(24))).toEqual('1 days')
      expect(Format.timeAgo(Time.days(1))).toEqual('1 days')
      expect(Format.timeAgo(Time.days(30))).toEqual('30 days')
    })
    test('invalid', () => {
      expect(Format.timeAgo('abc' as any)).toEqual('ERR')
      expect(consoleWarn).toBeCalled()
    })
  })
})
