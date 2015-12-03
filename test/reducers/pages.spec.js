import expect from 'unexpected'

import { SET_PAGE_ORIENTATION, ADD_WIDGET_TO_PAGE } from '../../src/actionTypes'
import pages from '../../src/reducers/pages'

describe('reducer: pages', () => {
  describe('initial state', () => {
    it('has a single page with portrait orientation', () => {
      expect(pages(undefined, {}), 'to satisfy', [{orientation: 'portrait'}])
    })

    it('has no widgets', () => {
      expect(pages(undefined, {}), 'to satisfy', [{widgets: []}])
    })
  })

  describe('SET_PAGE_ORIENTATION', () => {
    it('changes the page orientation', () => {
      const initialState = [{orientation: 'portrait'}, {orientation: 'portrait'}]
      const action = { type: SET_PAGE_ORIENTATION, payload: {page: 1, orientation: 'landscape'} }
      const finalState = pages(initialState, action)
      expect(finalState, 'to equal', [{orientation: 'portrait'}, {orientation: 'landscape'}])
    })
  })

  describe('ADD_WIDGET_TO_PAGE', () => {
    it('adds a widget to the page', () => {
      const initialState = [ {orientation: 'portrait', widgets: ['widget-1']} ]
      const action = { type: ADD_WIDGET_TO_PAGE, payload: {page: 0, id: 'widget-2'} }
      const finalState = pages(initialState, action)
      expect(finalState, 'to equal', [ {orientation: 'portrait', widgets: ['widget-1', 'widget-2']} ])
    })

    it("doesn't add a widget that already exists on the page", () => {
      const initialState = [ {orientation: 'portrait', widgets: ['widget-1']} ]
      const action = { type: ADD_WIDGET_TO_PAGE, payload: {page: 0, id: 'widget-1'} }
      const finalState = pages(initialState, action)
      expect(finalState, 'to equal', [ {orientation: 'portrait', widgets: ['widget-1']} ])
    })
  })
})
