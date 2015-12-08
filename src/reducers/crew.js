import update from 'react-addons-update'
import { handleActions } from 'redux-actions'
import {
  ADD_MEMBER,
  DELETE_MEMBER,
  SELECT_MEMBER,
  CLEAR_MEMBERS,
  SELECT_MERC,
  SET_SOULSTONES,
  RESET_SOULSTONES,
  SET_FACTION,
  SET_LEADER,
  SET_TOTEM,
  UPDATE_SOULSTONES,
  DELETE_TOTEM
} from '../actionTypes'

const CREW_STATE = {
  selectedFaction: "1",
  selectedLeader: "1",
  selectedTotem: {},
  selectedSoulstones: 50,
  selectedMember: "1",
  selectedMerc: "4",
  soulstoneAmount: 50,
  soulstonesRemaining: 50,
  members: []
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
    console.log(action)
    return update(state, {
      selectedTotem: { $set: action.payload },
      soulstonesRemaining: { $set: state.soulstonesRemaining - parseInt(action.payload.cost) }
    })
  },
  [UPDATE_SOULSTONES]: (state, action) => {
    return update(state, {
      selectedSoulstones: { $set: action.payload }
    })
  },
  [DELETE_TOTEM]: (state, action) => {
    return update(state, {
      selectedTotem: { $set: {} },
      soulstonesRemaining: { $set: state.soulstonesRemaining + parseInt(action.payload) }
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
  },
  [ADD_MEMBER]: (state, action) => {
    return update(state, {
      members: { $push: [action.payload] },
      soulstonesRemaining: { $set: state.soulstonesRemaining - parseInt(action.payload.cost) }
    })
  },
  [DELETE_MEMBER]: (state, action) => {
    return update(state, {
      members: { $splice: [[action.payload.id, 1]] },
      soulstonesRemaining: { $set: state.soulstonesRemaining + parseInt(action.payload.cost) }
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
      soulstoneAmount: { $set: parseInt(action.payload) },
      soulstonesRemaining: {
        $set: parseInt(action.payload) - (state.soulstoneAmount - state.soulstonesRemaining)
      }
    })
  },
  [RESET_SOULSTONES]: (state, action) => {
    return update(state, {
      soulstoneAmount: { $set: 50 },
      soulstonesRemaining: { $set: 50 }
    })
  }
}, CREW_STATE)

export default reducer
