import { handleActions } from 'redux-actions'
import { GET_MODEL_DATA } from '../actionTypes'

const MODEL_DATA_STATE = require('json!../data/modelData.json')

const reducer = handleActions({
  [GET_MODEL_DATA]: (state, action) => action.payload
}, MODEL_DATA_STATE)

export default reducer
