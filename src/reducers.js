import { combineReducers } from 'redux'
import { SET_TITLE, SET_PAGE_ORIENTATION, UPDATE_WIDGET_POSITION, ADD_WIDGET, ADD_WIDGET_TO_PAGE, SET_SELECTION } from './actions'
import { List, Map } from 'immutable'

const UNTITLED = "Untitled"

const INITIAL_POSITION = Map({
  x: 20,
  y: 20,
  width: 160,
  height: 160
})

const buildWidget = (id, type, position=INITIAL_POSITION, data={value: 'hello world'}) => {
  return Map({
    id,
    type,
    position,
    data: Map(data)
  })
}

const BLANK_PAGE = Map({
  orientation: 'portrait',
  widgets: List()
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
    case ADD_WIDGET_TO_PAGE:
      let addWidget = (widgets) => widgets.push(action.id)
      return state.update(action.page, page => page.update('widgets', addWidget))
    case SET_PAGE_ORIENTATION:
      return state.update(action.page, page => page.set('orientation', action.orientation))
    default:
      return state
  }
}

export function widgets(state = Map(), action) {
  switch (action.type) {
    case ADD_WIDGET:
      console.log(action)
      return state.set(action.id, buildWidget(action.id, action.widgetType))
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

export function currentlySelectedWidgets(state = List(), action) {
  switch (action.type) {
    case SET_SELECTION:
      return List(action.ids)
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