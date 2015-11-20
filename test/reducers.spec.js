import expect from 'expect'
import { setTitle } from '../src/actions'
import { title } from '../src/reducers'

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