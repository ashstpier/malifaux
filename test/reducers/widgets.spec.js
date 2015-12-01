import expect from 'unexpected'

import { ADD_WIDGET, UPDATE_WIDGET_POSITION } from '../../src/actionTypes'
import widgets, { buildWidget } from '../../src/reducers/widgets'

describe('reducer: widgets', () => {
  describe('initial state', () => {
    it('consists of an empty widget collection', () => {
      expect(widgets(undefined, {}), 'to equal', {})
    })
  })

  describe('ADD_WIDGET', () => {
    it('adds a widget to the widget collection', () => {
      const initialState = {}
      const action = { type: ADD_WIDGET, id: 'widget_1', widgetType: 'Text' }
      const finalState = widgets(initialState, action)
      expect(finalState, 'to only have key', 'widget_1')
      expect(finalState.widget_1, 'to satisfy', {
        id: 'widget_1',
        type: 'Text',
        position: {},
        data: {}
      })
    })
  })

  describe('UPDATE_WIDGET_POSITION', () => {
    it('moves widgets by an absolute amount when {relative: false}', () => {
      const initialState = { 'w1': buildWidget('w1', 'Text') }
      const newPosition = { x: 10, y: 30, width: 40, height: 50 }
      const action = { type: UPDATE_WIDGET_POSITION, ids: ['w1'], relative: false, changes: newPosition }
      const finalState = widgets(initialState, action)
      expect(finalState.w1.position, 'to equal', { x: 10, y: 30, width: 40, height: 50 })
    })

    it('moves widgets by a relative amount when {relative: true}', () => {
      const initialState = { 'w1': buildWidget('w1', 'Text', { x: 100, y: 100, width: 100, height: 100 }) }
      const newPosition = { x: 10, y: -10, width: 40, height: -50 }
      const action = { type: UPDATE_WIDGET_POSITION, ids: ['w1'], relative: true, changes: newPosition }
      const finalState = widgets(initialState, action)
      expect(finalState.w1.position, 'to equal', { x: 110, y: 90, width: 140, height: 50 })
    })
  })
})
