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

export function pages(state = [BLANK_PAGE], action) {
  switch (action.type) {
    case SET_PAGE_ORIENTATION:
      return [
        ...state.slice(0, action.page),
        Object.assign({}, state[action.page], {
          orientation: action.orientation
        }),
        ...state.slice(action.page + 1)
      ]
    default:
      return state
  }
}

export function currentPageIndex(state = 0, action) {
  switch (action.type) {
    default:
      return state
  }
}

const reportsApp = combineReducers({
  title,
  pages,
  currentPageIndex
})

export default reportsApp