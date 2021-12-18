export class Obj {
  static omit<T extends Record<string, any>, K extends keyof T>(
    object: T,
    omitKeys: K | K[]
  ): Omit<T, K> {
    const newObject = Object.assign({}, object)
    if (omitKeys instanceof Array) {
      omitKeys.forEach(key => {
        delete newObject[key]
      })
    } else {
      delete newObject[omitKeys]
    }
    return newObject
  }

  static pick<T extends Record<string, any>, K extends keyof T>(
    object: T,
    pickKeys: K | K[]
  ): Pick<T, K> {
    const newObject = {}
    if (pickKeys instanceof Array) {
      pickKeys.forEach(key => {
        // @ts-ignore
        newObject[key] = object[key]
      })
    } else {
      // @ts-ignore
      newObject[pickKeys] = object[pickKeys]
    }
    // @ts-ignore
    return newObject
  }

  static isEqual(objA: Record<string, any>, objB: Record<string, any>) {
    if (!objA || !objB) {
      return false
    }
    ;[objA, objB].forEach(obj => {
      Object.values(obj).forEach(value => {
        if (typeof value === 'function') {
          throw Error('Unable to compare two objects that contain functions.')
        }
      })
    })

    return JSON.stringify(objA) === JSON.stringify(objB)
  }
  static mapToArray<T, U>(
    object: Record<string, T>,
    mapper: (key: string, value: T) => U
  ): U[] {
    return Object.entries(object).map(([key, value]) => {
      return mapper(key, value)
    })
  }
}
