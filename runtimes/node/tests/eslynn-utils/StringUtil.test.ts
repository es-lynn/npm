import { Str } from '@es-lynn/utils'

describe('StringUtil', () => {
  describe('is_num', () => {
    test('Valid Number', async () => {
      expect(Str.isNum('1')).toBeTruthy()
      expect(Str.isNum('0.1')).toBeTruthy()
      expect(Str.isNum('0')).toBeTruthy()
      expect(Str.isNum('-1')).toBeTruthy()
      expect(Str.isNum('-0.1')).toBeTruthy()
      expect(Str.isNum('1 ')).toBeTruthy()
      expect(Str.isNum(' 1')).toBeTruthy()
      expect(Str.isNum(' 1 ')).toBeTruthy()
    })
    test('Invalid Number', async () => {
      expect(Str.isNum('192.168.1.1')).toBeFalsy()
      expect(Str.isNum('')).toBeFalsy()
      expect(Str.isNum('1a')).toBeFalsy()
      expect(Str.isNum('a1')).toBeFalsy()
    })
  })

  describe('is_blank', () => {
    test('Blank', async () => {
      expect(Str.isBlank('')).toBeTruthy()
      expect(Str.isBlank(' ')).toBeTruthy()
      expect(Str.isBlank('  ')).toBeTruthy()
      expect(Str.isBlank(null as any)).toBeTruthy()
      expect(Str.isBlank(undefined as any)).toBeTruthy()
    })
    test('Not blank', async () => {
      expect(Str.isBlank('a')).toBeFalsy()
      expect(Str.isBlank(' a')).toBeFalsy()
      expect(Str.isBlank('a ')).toBeFalsy()
    })
  })

  test('replace_all', () => {
    expect(
      Str.replaceAll(
        'the quick brown fox jumps over the lazy wolf',
        'the',
        '那个'
      )
    ).toEqual('那个 quick brown fox jumps over 那个 lazy wolf')
    expect(
      Str.replaceAll('the quick brown fox jumps over the lazy wolf', ' ', '.')
    ).toEqual('the.quick.brown.fox.jumps.over.the.lazy.wolf')
  })

  describe('remove', () => {
    test('remove 1 word', () => {
      expect(
        Str.remove('the quick brown fox jumps over the lazy wolf', ' ')
      ).toEqual('thequickbrownfoxjumpsoverthelazywolf')
    })
    test('remove 3 words', () => {
      expect(
        Str.remove('the quick brown fox jumps over the lazy wolf', [
          'quick',
          'brown',
          'lazy'
        ])
      ).toEqual('the   fox jumps over the  wolf')
    })
  })

  test('to_num', () => {
    expect(Str._num('1')).toEqual(1)
    expect(Str._num('-1')).toEqual(-1)
    expect(Str._num('1.1')).toEqual(1.1)
  })
})
