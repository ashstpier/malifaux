import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findWithType } from 'react-shallow-testutils'

import Toolbar from '../../src/components/Toolbar'
import ContentEditable from '../../src/components/ContentEditable'


function setup() {
  let props = {
    title: 'Test Document',
    onTitleChange: expect.createSpy(),
    onAddWidget: expect.createSpy()
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<Toolbar {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}


describe('component: Toolbar', () => {
  it('should render correctly', () => {
    const { output } = setup()
    expect(output.type).toBe('header')
    expect(output.props.id).toBe('toolbar')
  })

  it('should call onTitleChange when the title is edited', () => {
    const { output, props } = setup()
    let editable = findWithType(output, ContentEditable)
    editable.props.onChange("Hello")
    expect(props.onTitleChange).toHaveBeenCalledWith('Hello')
  })
})