import update from 'react-addons-update'
import { handleActions } from 'redux-actions'
import {
  ADD_MEMBER,
  DELETE_MEMBER,
  CLEAR_MEMBERS,
  SET_SOULSTONES,
  RESET_SOULSTONES,
  SET_FACTION,
  SET_LEADER,
  SET_TOTEM,
  DELETE_TOTEM
} from '../actionTypes'

const CREW_STATE = {
  soulstonesRemaining: 50,
  soulstoneAmount: 50,
  faction: {
    id: '1',
    name: 'Arcanists',
    color: '#374E75'
  },
  leader: {
    id: '1',
    name: 'Kaeris',
    cache: '4'
  },
  totem: {},
  members: []
}

const reducer = handleActions({
  [SET_FACTION]: (state, action) => {
    return update(state, {
      faction: { $set: action.payload }
    })
  },
  [SET_LEADER]: (state, action) => {
    return update(state, {
      leader: { $set: action.payload }
    })
  },
  [SET_TOTEM]: (state, action) => {
    return update(state, {
      totem: { $set: action.payload },
      soulstonesRemaining: { $set: state.soulstonesRemaining - parseInt(action.payload.cost) },
    })
  },
  [DELETE_TOTEM]: (state, action) => {
    return update(state, {
      totem: { $set: {} },
      soulstonesRemaining: { $set: state.soulstonesRemaining + parseInt(action.payload) }
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
      },
    })
  },
  [RESET_SOULSTONES]: (state, action) => {
    return update(state, {
      soulstonesRemaining: { $set: state.soulstoneAmount }
    })
  }
}, CREW_STATE)

export default reducer
