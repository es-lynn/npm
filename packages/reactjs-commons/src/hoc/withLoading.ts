import React, { JSXElementConstructor, useEffect, useState } from 'react'

export type AsyncProps<T = unknown> = {
  loading: boolean
  disabled: boolean
} & T

export type AsyncComponent<T extends React.FC> = {
  loading: boolean
  disabled: boolean
} & React.ComponentProps<T>

type ExtraProps = {
  onLoadingChange?: (loading: boolean) => void
}

type withAsyncOptions<T extends JSXElementConstructor<any>> = {
  asyncHandler?:
    | keyof React.ComponentProps<T>
    | (keyof React.ComponentProps<T>)[]
  omitProps?: ('loading' | 'disabled')[]
}
function getAsyncHandlers(key?: string | string[]): string[] {
  if (!key) {
    return ['onClick']
  } else if (typeof key === 'string') {
    return [key]
  } else if (key instanceof Array) {
    return key
  } else {
    throw TypeError('Invalid input for asyncHandler: ' + key)
  }
}

export const withLoading = <Component extends JSXElementConstructor<any>>(
  WrappedComponent: Component,
  options?: withAsyncOptions<Component>
) => {
  return (p: React.ComponentProps<Component> & ExtraProps) => {
    // @ts-ignore
    const asyncHandler = getAsyncHandlers(options?.asyncHandler)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
      p.onLoadingChange?.(loading)
      // FIXME: If p.onLoadingChange changes, it will call the old function
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])
    const map: Record<string, Function> = {}

    asyncHandler.forEach(funcName => {
      // @ts-ignore
      map[funcName] = async (...args: any[]) => {
        if (p[funcName]) {
          try {
            const result = p[funcName](...args)
            if (result instanceof Promise) {
              setLoading(true)
            }
            await result
          } catch (err) {
            console.error('Uncaught promise in AsyncButton: ' + err)
          } finally {
            setLoading(false)
          }
        }
      }
    })
    const props = {
      loading,
      disabled: p.disabled === true || loading
    }
    options?.omitProps?.forEach(omitProp => {
      delete props[omitProp]
    })
    return React.createElement(WrappedComponent, {
      ...p,
      ...props,
      ...map
    })
  }
}
