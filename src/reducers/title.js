import { SET_TITLE } from '../actionTypes'

const UNTITLED = 'Untitled'

export default function title (state = UNTITLED, action) {
  switch (action.type) {
    case SET_TITLE:
      return action.text

    default:
      return state
  }
}
