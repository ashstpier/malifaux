import expect from 'unexpected'

import currentPageIndex from '../../src/reducers/currentPageIndex'


describe('reducer: currentPageIndex', () => {
  describe("initial state", () => {
    it('returns 0 as the index of the first and only page', () => {
      expect(currentPageIndex(undefined, {}), 'to equal', 0)
    })
  })
})