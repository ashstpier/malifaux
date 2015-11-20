import expect from 'expect'
import * as actions from '../src/actions'

describe('actions', () => {
  it('setTitle should return a SET_TITLE action', () => {
    const text = 'A Title'
    const expectedAction = {
      type: actions.SET_TITLE,
      text
    }
    expect(actions.setTitle(text)).toEqual(expectedAction)
  })
})