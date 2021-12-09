import { Regex } from '@es-lynn/utils'

describe('Regex', () => {
  describe('ISODateString', () => {
    test('ISODateString', () => {
      expect(Regex.is.isoDate('2020-02-06')).toBeTruthy()
    })
    test('ISODateString #2', () => {
      expect(Regex.is.isoDate('2020-07-20T12:14:28.143Z')).toBeTruthy()
    })
    test('Do not parse ISODateString <= 1899', () => {
      expect(Regex.is.isoDate('1899-02-06')).toBeFalsy()
    })
    test('Do not parse ISODateString >= 2100', () => {
      expect(Regex.is.isoDate('2100-02-06')).toBeFalsy()
    })
    test('Invalid Month 0', () => {
      expect(Regex.is.isoDate('2020-00-06')).toBeFalsy()
    })
    test('Invalid Month 13', () => {
      expect(Regex.is.isoDate('2020-13-06')).toBeFalsy()
    })
    test('Invalid Date 0', () => {
      expect(Regex.is.isoDate('2020-02-00')).toBeFalsy()
    })
    test('Invalid Date 32nd', () => {
      expect(Regex.is.isoDate('2020-02-32')).toBeFalsy()
    })
    test('Invalid Format missing leading 0', () => {
      expect(Regex.is.isoDate('2020-2-6')).toBeFalsy()
    })
    test('ISODateString', () => {
      expect(Regex.is.isoDate('2020-02-06')).toBeTruthy()
    })
    test('rubbish', () => {
      expect(Regex.is.isoDate('rubbish')).toBeFalsy()
    })
    test('Limit end of string', () => {
      expect(Regex.is.isoDate('2020-02-06 ')).toBeFalsy()
    })
    test('Limit start of string', () => {
      expect(Regex.is.isoDate(' 2020-02-06')).toBeFalsy()
    })
  })
  describe('Email', () => {
    test('is valid email', () => {
      expect(Regex.is.email('geon@ihateregex.io')).toBeTruthy()
      expect(Regex.is.email('test@gmail.com')).toBeTruthy()
      expect(Regex.is.email('mail@test.org')).toBeTruthy()
      expect(Regex.is.email('mail@testing.com')).toBeTruthy()
    })
    test('is invalid email', () => {
      expect(Regex.is.email('hello@')).toBeFalsy()
      expect(Regex.is.email('@test')).toBeFalsy()
      expect(Regex.is.email('email@gmail')).toBeFalsy()
      expect(Regex.is.email('theproblem@test@gmail.com')).toBeFalsy()
      expect(Regex.is.email('mail with@space.com')).toBeFalsy()
    })
  })
})
