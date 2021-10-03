type Key = string | number

// Finds the maximum number in an array
function max(arr: number[]): number {
  // eslint-disable-next-line prefer-spread
  return Math.max.apply(Math, arr)
}

// Checks if an array is empty
function isEmpty<T>(arr: Array<T>): boolean {
  return arr.length === 0
}

// Returns a random value from an array
function random<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Returns the first item in an array
function first<T>(arr: Array<T>): T {
  if (isEmpty(arr)) {
    throw Error('Array is empty')
  }
  return arr[0]
}

// Returns the last item in an array
function last<T>(arr: Array<T>): T {
  if (isEmpty(arr)) {
    throw Error('Array is empty')
  }
  return arr[arr.length - 1]
}

function unique<T extends Key, K extends Key>(arr: Array<T>): T[]
function unique<T extends object, K extends Key>(
  arr: Array<T>,
  uniqueIdentifier: (item: T) => K
): T[]
function unique<T, K extends Key>(arr: Array<T>, uniqueIdentifier?: (item: T) => K): T[] {
  const map = new Map<K, T>()
  // Based on the signature, objects will always be required to pass uniqueIdentifier
  // If uniqueIdentifier is undefined, then item will always be a key
  const uniqueFn = uniqueIdentifier ?? ((item: T) => item as any)

  arr.forEach(item => {
    const uniqueId = uniqueFn(item)
    // This check will always return the first unique item even if there are duplicates
    if (!map.has(uniqueId)) {
      map.set(uniqueFn(item), item)
    }
  })
  return Array.from(map.values())
}

/**
 * reduceKeyFn will return the key that you want T to be sorted to
 * eg. groupBy(['a','ab','b','bb','bc','cc'], it => it[0])
 *     => { a: ['a', 'ab'], b: ['b', 'bb', 'bc'], c: ['cc']}
 * eg. groupBy([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], it => it % 2 === 0 ? 'even' : 'odd')
 *     => { even: [0, 2, 4, 6, 8], odd: [1, 3, 5, 7, 9] }
 * If you want to perform map or filter, please run those functions first before grouping
 */
function groupBy<T>(arr: Array<T>, reduceKeyFn: (it: T) => Key): Record<Key, T[]> {
  const map: Record<Key, T[]> = {}
  arr.forEach(item => {
    const key = reduceKeyFn(item)
    const collection = map[key]
    if (collection == null) {
      map[key] = [item]
    } else {
      map[key].push(item)
    }
  })
  return map
}

export const Arr = {
  max,
  first,
  groupBy,
  isEmpty,
  last,
  random,
  unique
}
