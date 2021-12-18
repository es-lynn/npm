import { Datee, sleep, Time } from '@es-lynn/utils'
import { Meta } from '@storybook/react/types-6-0'
import { Button, IButtonProps, NativeBaseProvider, Tag } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { withLoading } from 'reactjs-commons'
import { useForceUpdate } from 'reactjs-commons'
import { useAsyncQueueEffect } from 'reactjs-commons/dist/src/hooks/useAsyncQueueEffect'

export default {
  title: 'reactjs-commons/useAsyncQueueEffect'
} as Meta

export const Default = () => {
  const [requestId, setRequestId] = useState(new Date().getTime())
  const [delay, setDelay] = useState(0)
  const [results, setResults] = useState<string[]>([])
  const [queue, setQueue] = useState<string[]>([])
  useAsyncQueueEffect(async () => {
    await sleep(delay)
    setResults(prev => {
      return [
        ...prev,
        (() => {
          if (delay >= 1500) {
            return 'blue'
          } else if (delay >= 1000) {
            return 'green'
          }
          return 'red'
        })()
      ]
    })
    setQueue(prev => prev.slice(1, prev.length))
  }, [delay, requestId])
  return (
    <NativeBaseProvider>
      <View>
        <Text></Text>
        <Button
          style={{ backgroundColor: 'red' }}
          onPress={() => {
            setQueue(prev => [...prev, 'red'])
            setRequestId(new Date().getTime())
            setDelay(500)
          }}
        >
          1 second
        </Button>
        <Button
          style={{ backgroundColor: 'green' }}
          onPress={() => {
            setQueue(prev => [...prev, 'green'])
            setRequestId(new Date().getTime())
            setDelay(1000)
          }}
        >
          2 seconds
        </Button>
        <Button
          style={{ backgroundColor: 'blue' }}
          onPress={() => {
            setQueue(prev => [...prev, 'blue'])
            setRequestId(new Date().getTime())
            setDelay(1500)
          }}
        >
          3 seconds
        </Button>
        <View style={{ flexDirection: 'row' }}>
          <Text>Queue: </Text>
          {queue.slice(0).map((it, index) => (
            <Text key={index} style={{ color: it }}>
              {it + ' '}
            </Text>
          ))}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>Results: </Text>
          {results
            .slice(0)
            .reverse()
            .map((it, index) => (
              <Text key={index} style={{ color: it }}>
                {it + ' '}
              </Text>
            ))}
        </View>
      </View>
    </NativeBaseProvider>
  )
}
