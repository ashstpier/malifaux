import { combineReducers } from 'redux'
import { SET_TITLE } from './actions'

const UNTITLED = "Untitled"

export function title(state = UNTITLED, action) {
  switch (action.type) {
    case SET_TITLE:
      return action.text
    default:
      return state
  }
}

const reportsApp = combineReducers({
  title
})

export default reportsApp