import expect from 'expect'
import * as actions from '../src/actions'

describe('actions', () => {
  describe('setTitle', () => {
    it('should return a SET_TITLE action', () => {
      const text = 'A Title'
      const expectedAction = {
        type: actions.SET_TITLE,
        text
      }
      expect(actions.setTitle(text)).toEqual(expectedAction)
    })
  })

  describe('setPageOrientation', () => {
    it('should return a SET_PAGE_ORIENTATION action', () => {
      const orientation = 'landscape'
      const expectedAction = {
        type: actions.SET_PAGE_ORIENTATION,
        orientation
      }
      expect(actions.setPageOrientation(orientation)).toEqual(expectedAction)
    })
  })
})