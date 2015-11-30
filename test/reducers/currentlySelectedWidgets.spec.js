import expect from 'unexpected'

import { SET_SELECTION, ADD_SELECTION } from '../../src/actionTypes'
import currentlySelectedWidgets         from '../../src/reducers/currentlySelectedWidgets'


describe('reducer: currentlySelectedWidgets', () => {
  describe("initial state", () => {
    it('has an empty list of widgets', () => {
      expect(currentlySelectedWidgets(undefined, {}), 'to equal', [])
    })
  })

  describe('SET_SELECTION', () => {
    it('overrides the current selection ', () => {
      const initialState = ['test-3']
      const setSelection = { type: SET_SELECTION, ids: ['test-1', 'test-2'] }
      const finalState = currentlySelectedWidgets(initialState, setSelection)
      expect(finalState, 'to equal', ['test-1', 'test-2'])
    })
  })

  describe('ADD_SELECTION', () => {
    it('appends to the current selection ', () => {
      const initialState = ['test-1']
      const addSelection = { type: ADD_SELECTION, ids: ['test-2', 'test-3'] }
      const finalState = currentlySelectedWidgets(initialState, addSelection)
      expect(finalState, 'to equal', ['test-1', 'test-2', 'test-3'])
    })
  })
})