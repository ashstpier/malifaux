import expect from 'unexpected'

import * as actions from '../src/actions'
import * as types   from '../src/actionTypes'


describe('actions', () => {
  describe('setTitle', () => {
    it('returns a SET_TITLE action', () => {
      const text = 'A Title'
      const expectedAction = {
        type: types.SET_TITLE,
        text
      }
      expect(actions.setTitle(text), 'to equal', expectedAction)
    })
  })

  describe('setPageOrientation', () => {
    it('returns a SET_PAGE_ORIENTATION action', () => {
      const page = 0
      const orientation = 'landscape'
      const expectedAction = {
        type: types.SET_PAGE_ORIENTATION,
        page,
        orientation
      }
      expect(actions.setPageOrientation(0, orientation), 'to equal', expectedAction)
    })
  })
})