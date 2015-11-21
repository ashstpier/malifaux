// import expect from 'expect'
import { setTitle, setPageOrientation } from '../src/actions'
import { title, pages } from '../src/reducers'
import { List, Map, fromJS } from 'immutable'
import expect from 'unexpected'

describe('title reducer', () => {
  it('returns initial state', () => {
    expect(title(undefined, {}), 'to equal', 'Untitled')
  })

  it('handles SET_TITLE', () => {
    expect( title('', setTitle('Test')), 'to equal', 'Test')
  })
})

describe('page reducer', () => {
  it('returns initial state', () => {
    expect( pages(undefined, {}), 'to equal', fromJS([{orientation: 'portrait'}]))
  })

  it('handles SET_PAGE_ORIENTATION', () => {
    const state = pages(fromJS([{orientation: 'portrait'}]), setPageOrientation(0, 'landscape'))
    expect(
      state.toJS(),
      'to equal',
      [{orientation: 'landscape'}]
    )
  })
})