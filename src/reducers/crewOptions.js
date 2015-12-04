import update from 'react-addons-update'
import { handleActions } from 'redux-actions'
import { SET_FACTION, SET_LEADER, SET_TOTEM } from '../actionTypes'

const CREW_OPTION_STATE = {
  selectedFaction: "1",
  selectedLeader: "1",
  selectedTotem: ""
}

const reducer = handleActions({
  [SET_FACTION]: (state, action) => {
    return update(state, {
      selectedFaction: { $set: action.payload }
    })
  },
  [SET_LEADER]: (state, action) => {
    return update(state, {
      selectedLeader: { $set: action.payload }
    })
  },
  [SET_TOTEM]: (state, action) => {
    return update(state, {
      selectedTotem: { $set: action.payload }
    })
  }
}, CREW_OPTION_STATE)

export default reducer
