import update from 'react-addons-update'
import { handleActions } from 'redux-actions'

import { SET_SELECTION, ADD_SELECTION } from '../actionTypes'

const DEFAULT_STATE = []

const reducer = handleActions({
  [ADD_SELECTION]: (state, action) => update(state, { $push: action.payload }),
  [SET_SELECTION]: (state, action) => action.payload
}, DEFAULT_STATE)

export default reducer
