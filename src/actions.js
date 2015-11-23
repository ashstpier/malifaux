import React from 'react'

export const SET_TITLE = 'SET_TITLE'
export const SET_PAGE_ORIENTATION = 'SET_PAGE_ORIENTATION'
export const UPDATE_WIDGET_POSITION = 'UPDATE_WIDGET_POSITION'
export const ADD_WIDGET = 'ADD_WIDGET'
export const ADD_WIDGET_TO_PAGE = 'ADD_WIDGET_TO_PAGE'
export const SET_SELECTION = 'SET_SELECTION'


export function setTitle(text) {
  return { type: SET_TITLE, text }
}

export function setPageOrientation(page, orientation) {
  return { type: SET_PAGE_ORIENTATION, page, orientation }
}

export function updateWidgetPosition(id, changes) {
  return { type: UPDATE_WIDGET_POSITION, id, changes, relative: false }
}


export function updateRelativeWidgetPosition(id, changes) {
  return { type: UPDATE_WIDGET_POSITION, id, changes, relative: true }
}

export function addWidget(id, widgetType) {
  return { type: ADD_WIDGET, id, widgetType }
}

export function addWidgetToPage(id, page) {
  return { type: ADD_WIDGET_TO_PAGE, id, page }
}

export function setSelection(ids) {
  return { type: SET_SELECTION, ids }
}
