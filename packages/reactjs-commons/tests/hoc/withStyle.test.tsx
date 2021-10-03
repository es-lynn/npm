import { render } from '@testing-library/react'
import React from 'react'

import { withStyle } from '../../src/hoc/withStyle'

describe('withStyle', () => {
  const BlueDiv = withStyle('div')({
    backgroundColor: 'blue'
  })
  const utils = render(<BlueDiv data-testid={'blue-div'} />)
  it('', () => {
    const { getByTestId } = utils
    expect(getByTestId('blue-div')).toBeDefined()
    expect(getByTestId('blue-div').style.backgroundColor).toEqual('blue')
  })
})
