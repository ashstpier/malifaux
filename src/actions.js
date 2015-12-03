import * as types from './actionTypes'
import { createAction } from 'redux-actions'

export const setTitle = createAction(types.SET_TITLE, title => title)

export const setPageOrientation = createAction(types.SET_PAGE_ORIENTATION, (page, orientation) => {
  return { page, orientation }
})

export const updateWidgetPosition = createAction(types.UPDATE_WIDGET_POSITION, (ids, changes) => {
  return { ids, changes, relative: false }
})

export const updateRelativeWidgetPosition = createAction(types.UPDATE_WIDGET_POSITION, (ids, changes) => {
  return { ids, changes, relative: true }
})

export const addWidget = createAction(types.ADD_WIDGET, (id, widgetType) => {
  return { id, widgetType }
})

export const addWidgetToPage = createAction(types.ADD_WIDGET_TO_PAGE, (id, page) => {
  return { id, page }
})

export const setSelection = createAction(types.SET_SELECTION, ids => ids)

export const addSelection = createAction(types.ADD_SELECTION, ids => ids)
