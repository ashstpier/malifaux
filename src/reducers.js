import { combineReducers } from 'redux'
import crewOptions from './reducers/crewOptions'
import modelData from './reducers/modelData'

const malifauxApp = combineReducers({
  modelData,
  crewOptions
})

export default malifauxApp
