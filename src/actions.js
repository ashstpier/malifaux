import * as types from './actionTypes'


export function setTitle(text) {
  return { type: types.SET_TITLE, text }
}

export function setPageOrientation(page, orientation) {
  return { type: types.SET_PAGE_ORIENTATION, page, orientation }
}

export function updateWidgetPosition(id, changes) {
  return { type: types.UPDATE_WIDGET_POSITION, id, changes, relative: false }
}


export function updateRelativeWidgetPosition(ids, changes) {
  return { type: types.UPDATE_WIDGET_POSITION, ids, changes, relative: true }
}

export function addWidget(id, widgetType) {
  return { type: types.ADD_WIDGET, id, widgetType }
}

export function addWidgetToPage(id, page) {
  return { type: types.ADD_WIDGET_TO_PAGE, id, page }
}

export function setSelection(ids) {
  return { type: types.SET_SELECTION, ids }
}

export function addSelection(ids) {
  return { type: types.ADD_SELECTION, ids }
}
