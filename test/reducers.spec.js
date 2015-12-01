import expect from 'unexpected'

import reduce from '../src/reducers'

describe('reducer', () => {
  it('reduces an initial root state', () => {
    const state = reduce(undefined, {})
    expect(state, 'to exhaustively satisfy', {
      title: expect.it('to be a string'),
      pages: expect.it('to be an array'),
      widgets: expect.it('to be an object'),
      currentPageIndex: expect.it('to be a number'),
      currentlySelectedWidgets: expect.it('to be an array')
    })
  })
})
