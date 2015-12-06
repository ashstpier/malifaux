import update from 'react-addons-update'
import { handleActions } from 'redux-actions'
import { ADD_MEMBER, DELETE_MEMBER, SELECT_MEMBER, CLEAR_MEMBERS, SELECT_MERC, SET_SOULSTONES } from '../actionTypes'

const CREW_STATE = {
  selectedMember: "1",
  selectedMerc: "4",
  soulstoneAmount: 50,
  soulstonesRemaining: 50,
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
      members: { $push: [action.payload] },
      soulstonesRemaining: { $set: state.soulstonesRemaining - parseInt(action.payload.cost) }
    })
  },
  [DELETE_MEMBER]: (state, action) => {
    return update(state, {
      members: { $splice: [[action.payload, 1]] }
    })
  },
  [CLEAR_MEMBERS]: (state, action) => {
    return update(state, {
      members: { $set: [] },
      soulstonesRemaining: { $set: state.soulstoneAmount }
    })
  },
  [SET_SOULSTONES]: (state, action) => {
    return update(state, {
      soulstoneAmount: { $set: action.payload }
    })
  }
}, CREW_STATE)

export default reducer
