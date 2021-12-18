import { Datee, sleep, Time } from '@es-lynn/utils'
import { Meta } from '@storybook/react/types-6-0'
import {
  Button,
  IButtonProps,
  Input,
  NativeBaseProvider,
  NumberInput,
  NumberInputField,
  Tag
} from 'native-base'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useFormState, usePrevious, withLoading } from 'reactjs-commons'
import { useForceRefresh } from 'reactjs-commons'

export default {
  title: 'reactjs-commons/useFormState'
} as Meta

export const Default = () => {
  const [form, setForm] = useFormState<{
    name?: string
    address?: string
    dob?: string
    phoneNo?: number
  }>({
    name: undefined,
    address: undefined,
    dob: undefined,
    phoneNo: undefined
  } as any)
  return (
    <NativeBaseProvider>
      <Input
        placeholder={'name'}
        value={form.name}
        onChangeText={text => setForm('name', text)}
      />
      <Input
        placeholder={'address'}
        value={form.address}
        onChangeText={text => setForm('address', text)}
      />
      <Input
        placeholder={'dob'}
        value={form.dob}
        onChangeText={text => setForm('dob', text)}
      />
      <Input
        keyboardType={'numeric'}
        placeholder={'phoneNo'}
        value={form.phoneNo?.toString()}
        onChangeText={text =>
          setForm('phoneNo', text === '' ? undefined : Number.parseInt(text))
        }
      />
      <Text>{JSON.stringify(form, null, 2)}</Text>
    </NativeBaseProvider>
  )
}
