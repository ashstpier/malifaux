// import expect from 'expect'
import { setTitle, setPageOrientation, setSelection, addSelection } from '../src/actions'
import { title, pages, currentlySelectedWidgets, currentPageIndex } from '../src/reducers'
import expect from 'unexpected'

describe('currentPageIndex reducer', () => {
  it('returns initial state', () => {
    expect(currentPageIndex(undefined, {}), 'to equal', 0)
  })
})

describe('title reducer', () => {
  it('returns initial state', () => {
    expect(title(undefined, {}), 'to equal', 'Untitled')
  })

  it('handles SET_TITLE', () => {
    expect( title('', setTitle('Test')), 'to equal', 'Test')
  })
})

describe('pages reducer', () => {
  describe('initial state', () => {
    it('has a single page with portrait orientation', () => {
      expect( pages(undefined, {}), 'to satisfy', [{orientation: 'portrait'}])
    })
    it('has no widgets', () => {
      expect( pages(undefined, {}), 'to satisfy', [{widgets: []}])
    })
  })

  it('handles SET_PAGE_ORIENTATION', () => {
    const state = pages([{orientation: 'portrait'}], setPageOrientation(0, 'landscape'))
    expect(
      state,
      'to equal',
      [{orientation: 'landscape'}]
    )
  })
})

describe('currentlySelectedWidgets reducer', () => {
  it('returns initial state', () => {
    expect(currentlySelectedWidgets(undefined, {}), 'to equal', [])
  })

  it('handles SET_SELECTION', () => {
    const state = currentlySelectedWidgets([], setSelection(['test-1', 'test-2']))
    expect(state, 'to equal', ['test-1', 'test-2'])
  })

  it('handles ADD_SELECTION', () => {
    const state = currentlySelectedWidgets(['test-1'], addSelection(['test-2', 'test-3']))
    expect(state, 'to equal', ['test-1', 'test-2', 'test-3'])
  })
})