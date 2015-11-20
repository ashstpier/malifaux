import { combineReducers } from 'redux'
import { SET_TITLE, SET_PAGE_ORIENTATION } from './actions'

const UNTITLED = "Untitled"
const BLANK_PAGE = {
  orientation: 'portrait'
}

export function title(state = UNTITLED, action) {
  switch (action.type) {
    case SET_TITLE:
      return action.text
    default:
      return state
  }
}

export function page(state = BLANK_PAGE, action) {
  switch (action.type) {
    case SET_PAGE_ORIENTATION:
      return Object.assign({}, state, {
        orientation: action.orientation
      })
    default:
      return state
  }
}

const reportsApp = combineReducers({
  title,
  page
})

export default reportsApp