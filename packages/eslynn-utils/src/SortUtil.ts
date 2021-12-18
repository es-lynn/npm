function numericFn<T>(mapper: (item: T) => number, desc = false) {
  if (!desc) {
    return (a: T, b: T) => mapper(a) - mapper(b)
  }
  return (b: T, a: T) => mapper(a) - mapper(b)
}
function numeric<T>(array: T[], mapper: (item: T) => number, desc = false) {
  return array.slice().sort(numericFn(mapper, desc))
}

function date<T>(array: T[], mapper: (item: T) => Date, desc = false) {
  return numeric(array, item => mapper(item).getTime(), desc)
}

function alphabeticFn<T>(mapper: (item: T) => string, desc = false) {
  if (!desc) {
    return (a: T, b: T) =>
      mapper(a).localeCompare(mapper(b), 'en', { sensitivity: 'base' })
  }
  return (b: T, a: T) =>
    mapper(a).localeCompare(mapper(b), 'en', { sensitivity: 'base' })
}

function alphabetic<T>(
  array: T[],
  mapper: (item: T) => string,
  desc = false
): T[] {
  return array.slice().sort(alphabeticFn(mapper, desc))
}

export const SortUtil = { numeric, numericFn, date, alphabetic, alphabeticFn }
