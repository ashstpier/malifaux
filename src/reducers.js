import { combineReducers } from 'redux'
import { SET_TITLE, SET_PAGE_ORIENTATION } from './actions'
import { List, Map } from 'immutable'

const UNTITLED = "Untitled"

const SIMPLE_WIDGET = Map({
  type: 'text',
  data: Map({
    value: 'hello world'
  })
})

const BLANK_PAGE = Map({
  orientation: 'portrait',
  widgets: List.of(SIMPLE_WIDGET)
})
const INITIAL_PAGE_LIST = List.of(BLANK_PAGE)

export function title(state = UNTITLED, action) {
  switch (action.type) {
    case SET_TITLE:
      return action.text
    default:
      return state
  }
}

export function pages(state = INITIAL_PAGE_LIST, action) {
  switch (action.type) {
    case SET_PAGE_ORIENTATION:
      return state.update(action.page, page => page.set('orientation', action.orientation))
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