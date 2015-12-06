import * as types from './actionTypes'
import { createAction } from 'redux-actions'

export const getModelData = createAction(types.GET_MODEL_DATA, modelData => modelData)
export const setFaction = createAction(types.SET_FACTION, faction_id => faction_id)
export const setLeader = createAction(types.SET_LEADER, leader_id => leader_id)
export const setTotem = createAction(types.SET_TOTEM, totem_id => totem_id)
export const setSoulstones = createAction(types.SET_SOULSTONES, soulstones => soulstones)
export const changeSoulstones = createAction(types.UPDATE_SOULSTONES, soulstones => soulstones)
export const addMember = createAction(types.ADD_MEMBER, member => member)
export const deleteMember = createAction(types.DELETE_MEMBER, index => index)
export const selectMember = createAction(types.SELECT_MEMBER, member => member)
export const selectMerc = createAction(types.SELECT_MERC, member => member)
export const clearMembers = createAction(types.CLEAR_MEMBERS, member => member)