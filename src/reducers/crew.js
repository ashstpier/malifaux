import update from 'react-addons-update'
import { handleActions } from 'redux-actions'
import { ADD_MEMBER, SELECT_MEMBER, CLEAR_MEMBERS, SELECT_MERC } from '../actionTypes'

const CREW_STATE = {
  selectedMember: "1",
  selectedMerc: "1",
  members: []
}

const reducer = handleActions({
  [SELECT_MEMBER]: (state, action) => {
    return update(state, {
      selectedMember: { $set: action.payload }
    })
  },
  [SELECT_MERC]: (state, action) => {
    return update(state, {
      selectedMerc: { $set: action.payload }
    })
  },
  [ADD_MEMBER]: (state, action) => {
    return update(state, {
      members: { $push: [action.payload] }
    })
  },
  [CLEAR_MEMBERS]: (state, action) => {
    return update(state, {
      members: { $set: [] }
    })
  }
}, CREW_STATE)

export default reducer
