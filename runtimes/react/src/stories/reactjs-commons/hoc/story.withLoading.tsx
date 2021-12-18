import { sleep } from '@es-lynn/utils'
import { Meta } from '@storybook/react/types-6-0'
import { Button, IButtonProps, NativeBaseProvider, Tag } from 'native-base'
import React from 'react'
import { withLoading } from 'reactjs-commons'

type MyButtonProps = {
  loading?: boolean
  disabled?: boolean
} & IButtonProps
const MyButton = ({ loading, disabled, ...rest }: MyButtonProps) => {
  const children = (() => {
    if (loading) return 'Loading'
    else if (disabled) return 'Disabled'
    return rest.children
  })()
  return (
    <Button
      style={{ backgroundColor: disabled ? 'grey' : '#06B6D4', marginTop: 8 }}
      isLoading={loading}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  )
}
const LoadingButton = withLoading(MyButton, {
  asyncHandler: 'onPress',
  omitProps: ['disabled']
})

export default {
  title: 'reactjs-commons/withLoading'
} as Meta

export const Default = () => {
  return (
    <NativeBaseProvider>
      <LoadingButton
        onPress={async () => {
          await sleep(1000)
        }}
      >
        Click Me
      </LoadingButton>
      <MyButton disabled={true} />
      <MyButton loading={true} />
    </NativeBaseProvider>
  )
}
