import React from 'react'

export const SET_TITLE = 'SET_TITLE'

export function setTitle(text) {
  return { type: SET_TITLE, text }
}