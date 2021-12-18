import { Datee, sleep, Time } from '@es-lynn/utils'
import { Meta } from '@storybook/react/types-6-0'
import {
  Button,
  IButtonProps,
  Input,
  NativeBaseProvider,
  Tag
} from 'native-base'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { usePrevious, withLoading } from 'reactjs-commons'
import { useForceRefresh } from 'reactjs-commons'

export default {
  title: 'reactjs-commons/usePrevious'
} as Meta

export const Default = () => {
  const [counter, setCounter] = useState<number>(0)
  const prevValue = usePrevious(counter)
  const prevPrevValue = usePrevious(prevValue)
  return (
    <NativeBaseProvider>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text>{counter}</Text>
        <Button
          style={{ marginLeft: 8 }}
          onPress={() => setCounter(prev => prev + 1)}
        >
          +
        </Button>
        <Button onPress={() => setCounter(prev => prev - 1)}>-</Button>
      </View>
      <Text>Previous value: {prevValue}</Text>
      <Text>Previous, previous value: {prevPrevValue}</Text>
    </NativeBaseProvider>
  )
}
