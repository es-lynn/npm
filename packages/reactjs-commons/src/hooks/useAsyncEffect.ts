import { Rand } from '@es-lynn/devtools'
import queue from 'queue'
import { DependencyList, useEffect, useRef, useState } from 'react'

export function useAsyncEffect(
  effect: () => Promise<void>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deps: void[]
): void {
  useEffect(() => {
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
