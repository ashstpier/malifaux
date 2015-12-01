import expect from 'unexpected'

import * as actions from '../src/actions'
import * as types from '../src/actionTypes'

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

  describe('updateWidgetPosition', () => {
    it('returns a UPDATE_WIDGET_POSITION action with {relative: false}', () => {
      const ids = ['w1']
      const changes = {x: 1}
      const expectedAction = {
        type: types.UPDATE_WIDGET_POSITION,
        ids,
        changes,
        relative: false
      }
      expect(actions.updateWidgetPosition(ids, changes), 'to equal', expectedAction)
    })
  })

  describe('updateRelativeWidgetPosition', () => {
    it('returns a UPDATE_WIDGET_POSITION action with {relative: true}', () => {
      const ids = ['w1']
      const changes = {x: 1}
      const expectedAction = {
        type: types.UPDATE_WIDGET_POSITION,
        ids,
        changes,
        relative: true
      }
      expect(actions.updateRelativeWidgetPosition(ids, changes), 'to equal', expectedAction)
    })
  })

  describe('addWidget', () => {
    it('returns a ADD_WIDGET action', () => {
      const id = 'w1'
      const widgetType = 'Text'
      const expectedAction = {
        type: types.ADD_WIDGET,
        id,
        widgetType
      }
      expect(actions.addWidget(id, widgetType), 'to equal', expectedAction)
    })
  })

  describe('addWidgetToPage', () => {
    it('returns a ADD_WIDGET_TO_PAGE action', () => {
      const id = 'w1'
      const page = 0
      const expectedAction = {
        type: types.ADD_WIDGET_TO_PAGE,
        id,
        page
      }
      expect(actions.addWidgetToPage(id, page), 'to equal', expectedAction)
    })
  })

  describe('setSelection', () => {
    it('returns a SET_SELECTION action', () => {
      const ids = ['w1']
      const expectedAction = {
        type: types.SET_SELECTION,
        ids
      }
      expect(actions.setSelection(ids), 'to equal', expectedAction)
    })
  })

  describe('addSelection', () => {
    it('returns a ADD_SELECTION action', () => {
      const ids = ['w1']
      const expectedAction = {
        type: types.ADD_SELECTION,
        ids
      }
      expect(actions.addSelection(ids), 'to equal', expectedAction)
    })
  })

// export function setSelection (ids) {
//   return { type: types.SET_SELECTION, ids }
// }

// export function addSelection (ids) {
//   return { type: types.ADD_SELECTION, ids }
// }
})
