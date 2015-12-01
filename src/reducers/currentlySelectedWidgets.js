import update from 'react-addons-update'

import { SET_SELECTION, ADD_SELECTION } from '../actionTypes'

export default function currentlySelectedWidgets (state = [], action) {
  switch (action.type) {
    case ADD_SELECTION:
      return update(state, { $push: action.ids })

    case SET_SELECTION:
      return action.ids

    default:
      return state
  }
}
