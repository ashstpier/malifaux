import * as types from './actionTypes'
import { createAction } from 'redux-actions'

export const setFaction = createAction(types.SET_FACTION, faction_id => faction_id)
export const setLeader = createAction(types.SET_LEADER, leader_id => leader_id)
export const setTotem = createAction(types.SET_TOTEM, totem_id => totem_id)
export const getModelData = createAction(types.GET_MODEL_DATA, modelData => modelData)