import { Datee, sleep, Time } from '@es-lynn/utils'
import { Meta } from '@storybook/react/types-6-0'
import { Button, IButtonProps, NativeBaseProvider, Tag } from 'native-base'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useAsyncEffect, withLoading } from 'reactjs-commons'
import { useForceUpdate } from 'reactjs-commons'

export default {
  title: 'reactjs-commons/useAsyncEffect'
} as Meta

export const Default = () => {
  const [text, setText] = useState('This text will update in 5 seconds')
  useAsyncEffect(async () => {
    await sleep(1000)
    setText('This text will update in 4 seconds')
    await sleep(1000)
    setText('This text will update in 3 seconds')
    await sleep(1000)
    setText('This text will update in 2 seconds')
    await sleep(1000)
    setText('This text will update in 1 seconds')
    await sleep(1000)
    setText('useAsyncEffect successfully executed!')
  }, [])
  return (
    <NativeBaseProvider>
      <Text>{text}</Text>
    </NativeBaseProvider>
  )
}
