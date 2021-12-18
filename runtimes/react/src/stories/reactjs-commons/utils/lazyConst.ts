import { ComponentType, lazy } from 'react'

export const lazyConst = <T extends {}, K extends keyof T>(
  loader: () => Promise<T>
) =>
  new Proxy({} as T, {
    // @ts-ignore
    get: (target, componentName: K) => {
      return lazy(() =>
        loader().then(file => ({
          default: file[componentName] as unknown as ComponentType<any>
        }))
      )
    }
  })
