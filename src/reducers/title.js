import { handleActions } from 'redux-actions'

import { SET_TITLE } from '../actionTypes'

const UNTITLED = 'Untitled'

const reducer = handleActions({
  [SET_TITLE]: (state, action) => action.payload
}, UNTITLED)

export default reducer
