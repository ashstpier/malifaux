import expect from 'unexpected'

import { SET_TITLE } from '../../src/actionTypes'
import title         from '../../src/reducers/title'


describe('reducer: title', () => {
  describe("initial state", () => {
    it('has a default title of "Untitled"', () => {
      expect(title(undefined, {}), 'to equal', 'Untitled')
    })
  })

  describe('SET_TITLE', () => {
    it('sets the title to the newly provided value', () => {
      const initialState = 'Old'
      const action = { type: SET_TITLE, text: 'New' }
      const finalState = title(initialState, action)
      expect(finalState, 'to equal', 'New')
    })
  })
})