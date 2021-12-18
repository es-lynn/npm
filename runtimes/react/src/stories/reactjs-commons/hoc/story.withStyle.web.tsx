import { sleep } from '@es-lynn/utils'
import { Meta } from '@storybook/react/types-6-0'
import { Button, IButtonProps, NativeBaseProvider, Tag } from 'native-base'
import React from 'react'
import { withLoading, withStyle } from 'reactjs-commons'

const c: React.ElementType = Button

export default {
  title: 'reactjs-commons/withStyle (Web)'
} as Meta

const RoundedButton = withStyle('button')({
  marginTop: 8,
  borderRadius: 10,
  borderWidth: 0.5
})

const ShadowRoundedButton = withStyle(RoundedButton)({
  boxShadow: '1px 4px 1px #9E9E9E'
})

const DisabledButton = withStyle(RoundedButton)(props => ({
  backgroundColor: props.disabled ? '#999' : '#F0F0F0'
}))

const CircleButton = withStyle('button')<{ size: number }>(props => ({
  borderRadius: props.size / 2,
  height: props.size,
  width: props.size
}))

export const Default = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
        <button>Regular Button</button>
        <RoundedButton onClick={() => console.log('onClick')}>
          My Rounded Button
        </RoundedButton>
        <RoundedButton style={{ backgroundColor: '#FFCC00' }}>
          My Yellow Button
        </RoundedButton>
        <RoundedButton style={{ borderWidth: 1, borderColor: '#FF3333' }}>
          My Red Border Button
        </RoundedButton>
        <ShadowRoundedButton>My Shadow Button</ShadowRoundedButton>
        <DisabledButton>Enabled</DisabledButton>
        <DisabledButton disabled={true}>Disabled</DisabledButton>
        <div style={{ flexDirection: 'row', display: 'flex', marginTop: 10 }}>
          <CircleButton size={40}>S40</CircleButton>
          <CircleButton size={60}>S60</CircleButton>
          <CircleButton size={50}>S50</CircleButton>
        </div>
      </div>
    </>
  )
}
