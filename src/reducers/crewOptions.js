import update from 'react-addons-update'
import { handleActions } from 'redux-actions'
import {
  SELECT_MEMBER,
  SELECT_MERC,
  SET_SOULSTONES,
  RESET_SOULSTONES,
  SET_FACTION,
  SET_LEADER,
  SET_TOTEM,
  UPDATE_SOULSTONES
} from '../actionTypes'

const CREW_OPTIONS_STATE = {
  selectedSoulstones: 50,
  selectedMember: "1",
  selectedMerc: "4",
  selectedFaction: "1",
  selectedLeader: "1",
  selectedTotem: ""
}

const reducer = handleActions({
  [SET_FACTION]: (state, action) => {
    return update(state, {
      selectedFaction: { $set: action.payload.id }
    })
  },
  [SET_LEADER]: (state, action) => {
    return update(state, {
      selectedLeader: { $set: action.payload.id }
    })
  },
  [SET_TOTEM]: (state, action) => {
    return update(state, {
      selectedTotem: { $set: action.payload.id }
    })
  },
  [UPDATE_SOULSTONES]: (state, action) => {
    return update(state, {
      selectedSoulstones: { $set: action.payload }
    })
  },
  [SELECT_MEMBER]: (state, action) => {
    return update(state, {
      selectedMember: { $set: action.payload }
    })
  },
  [SELECT_MERC]: (state, action) => {
    return update(state, {
      selectedMerc: { $set: action.payload }
    })
  }
}, CREW_OPTIONS_STATE)

export default reducer
