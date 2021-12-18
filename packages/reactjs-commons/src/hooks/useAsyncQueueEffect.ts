import queue from 'queue'
import { DependencyList, useEffect, useRef, useState } from 'react'

// TODO: It's probably better to just skip promises in between
export function useAsyncQueueEffect(
  effect: () => Promise<void>,
  deps?: DependencyList
): void {
  const q = useRef(queue({ results: [], concurrency: 1, autostart: true }))
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return q.current.end()
    }
  }, [])
  useEffect(() => {
    if (q.current.length >= 5) {
      console.warn(
        `useAsyncEffect currently has ${q.current.length} items queued up. Your dependencies might be updating too quickly. \n\nEnsure that the time taken for the async effect is shorter than the time it takes for dependencies to update.`
      )
    }
    q.current.push(async () => {
      await effect()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
