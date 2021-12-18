import React, { useCallback } from 'react'

export function useForceUpdate(): () => void {
  const [, forceUpdate] = React.useState({})
  return useCallback(() => forceUpdate({}), [])
}
