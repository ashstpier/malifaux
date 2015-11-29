import { combineReducers } from 'redux'
import { SET_TITLE, SET_PAGE_ORIENTATION, UPDATE_WIDGET_POSITION, ADD_WIDGET, ADD_WIDGET_TO_PAGE, SET_SELECTION, ADD_SELECTION } from './actions'
import update from 'react-addons-update'
import { clone, transform, reduce } from 'lodash'

const UNTITLED = "Untitled"

const INITIAL_POSITION = {
  x: 20,
  y: 20,
  width: 160,
  height: 160
}

const buildWidget = (id, type, position=INITIAL_POSITION, data={value: 'hello world'}) => {
  return {
    id,
    type,
    position,
    data: data
  }
}

const BLANK_PAGE = {
  orientation: 'portrait',
  widgets: []
}

const INITIAL_PAGE_LIST = [ BLANK_PAGE ]

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
      return update(state, {
        [action.page]: { widgets: { $push: [action.id] } }
      })
    case SET_PAGE_ORIENTATION:
      return state.update(action.page, page => page.set('orientation', action.orientation))
    default:
      return state
  }
}




export function widgets(state = {}, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return update(state, {
        $merge: {
          [action.id]: buildWidget(action.id, action.widgetType)
        }
      })

    case UPDATE_WIDGET_POSITION:
      return reduce(action.ids, (s, id) => {
        var newPosition = clone(action.changes)
        if(action.relative) {
          let oldPosition = s[id].position
          newPosition = transform(newPosition, (p,v,k) => p[k] = oldPosition[k] + v)
        }
        return update(s, {
          [id]: {
            position: {
              $merge: newPosition
            }
          }
        })
        return s
      }, state)

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

export function currentlySelectedWidgets(state = [], action) {
  switch (action.type) {
    case ADD_SELECTION:
      return update(state, { $push: action.ids })
    case SET_SELECTION:
      return action.ids
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