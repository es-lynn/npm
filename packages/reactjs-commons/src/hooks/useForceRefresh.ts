import React, { useCallback } from 'react'

export function useForceRefresh(onRefresh?: () => void): [() => void, number] {
  const [state, updateState] = React.useState<number>(Date.now())
  return [
    useCallback(() => {
      onRefresh?.()
      updateState(Date.now())
    }, [onRefresh]),
    state
  ]
}
