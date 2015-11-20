import React from 'react'

export const SET_TITLE = 'SET_TITLE'
export const SET_PAGE_ORIENTATION = 'SET_PAGE_ORIENTATION'

export function setTitle(text) {
  return { type: SET_TITLE, text }
}

export function setPageOrientation(page, orientation) {
  return { type: SET_PAGE_ORIENTATION, page, orientation }
}