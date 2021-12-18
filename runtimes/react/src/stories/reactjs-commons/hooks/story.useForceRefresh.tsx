import { Datee, sleep, Time } from '@es-lynn/utils'
import { Meta } from '@storybook/react/types-6-0'
import { Button, IButtonProps, NativeBaseProvider, Tag } from 'native-base'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { withLoading } from 'reactjs-commons'
import { useForceUpdate } from 'reactjs-commons'

export default {
  title: 'reactjs-commons/useForceRefresh'
} as Meta

export const Default = () => {
  const forceUpdate = useForceUpdate()
  return (
    <NativeBaseProvider>
      <Text>Time: {new Date().toISOString()}</Text>
      <Button onPress={() => forceUpdate()}>forceUpdate()</Button>
    </NativeBaseProvider>
  )
}
