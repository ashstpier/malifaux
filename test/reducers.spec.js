import expect from 'expect'
import { setTitle, setPageOrientation } from '../src/actions'
import { title, page } from '../src/reducers'

describe('title reducer', () => {
  it('returns initial state', () => {
    expect(
      title(undefined, {})
    ).toEqual('Untitled')
  })

  it('handles SET_TITLE', () => {
    expect(
      title('', setTitle('Test'))
    ).toEqual('Test')
  })
})

describe('page reducer', () => {
  it('returns initial state', () => {
    expect(
      page(undefined, {})
    ).toEqual({orientation: 'portrait'})
  })

  it('handles SET_PAGE_ORIENTATION', () => {
    expect(
      page({orientation: 'portrait'}, setPageOrientation('landscape'))
    ).toEqual({orientation: 'landscape'})
  })
})