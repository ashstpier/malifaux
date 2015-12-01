import update from 'react-addons-update'
import { includes } from 'lodash'

import { ADD_WIDGET_TO_PAGE, SET_PAGE_ORIENTATION } from '../actionTypes'

const BLANK_PAGE = {
  orientation: 'portrait',
  widgets: []
}

const INITIAL_PAGE_LIST = [ BLANK_PAGE ]

export default function pages (state = INITIAL_PAGE_LIST, action) {
  switch (action.type) {
    case ADD_WIDGET_TO_PAGE:
      const alreadyIncludedOnPage = includes(state[action.page].widgets, action.id)
      if (alreadyIncludedOnPage) { return state }
      return update(state, {
        [action.page]: { widgets: { $push: [action.id] } }
      })

    case SET_PAGE_ORIENTATION:
      return update(state, {
        [action.page]: {
          orientation: { $set: action.orientation }
        }
      })

    default:
      return state
  }
}
