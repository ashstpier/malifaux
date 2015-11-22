import { combineReducers } from 'redux'
import { SET_TITLE, SET_PAGE_ORIENTATION, UPDATE_WIDGET_POSITION } from './actions'
import { List, Map } from 'immutable'

const UNTITLED = "Untitled"

const SIMPLE_WIDGET = Map({
  id: 'widget-1',
  type: 'text',
  position: Map({
    x: 20,
    y: 20,
    width: 160,
    height: 160
  }),
  data: Map({
    value: 'hello world'
  })
})

const BLANK_PAGE = Map({
  orientation: 'portrait',
  widgets: List.of('widget-1')
})

const INITIAL_PAGE_LIST = List.of(BLANK_PAGE)
const INITIAL_WIDGETS_MAP = Map({'widget-1': SIMPLE_WIDGET})

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

export function widgets(state = INITIAL_WIDGETS_MAP, action) {
  switch (action.type) {
    case UPDATE_WIDGET_POSITION:
      var applyChanges;
      if(action.relative) {
        applyChanges = (pos) => (v,k) => pos.set(k, (pos.get(k) + v))
      } else {
        applyChanges = (pos) => (v,k) => pos.set(k, v)
      }
      const mutator = (pos) => Map(action.changes).forEach(applyChanges(pos))
      return state.update(action.id, (widget) => {
        return widget.update('position', (w) => w.withMutations(mutator))
      })
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

export function currentlySelectedWidgets(state = List.of('widget-1'), action) {
  switch (action.type) {
    default:
      return state
  }
}

const reportsApp = combineReducers({
  title,
  pages,
  widgets,
  currentPageIndex,
  currentlySelectedWidgets
})

export default reportsApp