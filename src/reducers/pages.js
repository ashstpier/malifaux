import update from 'react-addons-update'
import { includes } from 'lodash'
import { handleActions } from 'redux-actions'

import { ADD_WIDGET_TO_PAGE, SET_PAGE_ORIENTATION } from '../actionTypes'

const BLANK_PAGE = {
  orientation: 'portrait',
  widgets: []
}

const INITIAL_PAGE_LIST = [ BLANK_PAGE ]

const reducer = handleActions({
  [ADD_WIDGET_TO_PAGE]: (state, action) => {
    const payload = action.payload
    const alreadyIncludedOnPage = includes(state[payload.page].widgets, payload.id)
    if (alreadyIncludedOnPage) { return state }
    return update(state, {
      [payload.page]: { widgets: { $push: [payload.id] } }
    })
  },

  [SET_PAGE_ORIENTATION]: (state, action) => {
    const payload = action.payload
    return update(state, {
      [payload.page]: {
        orientation: { $set: payload.orientation }
      }
    })
  }
}, INITIAL_PAGE_LIST)

export default reducer
