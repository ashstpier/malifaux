import { combineReducers } from 'redux'
import crewOptions from './reducers/crewOptions'
import modelData from './reducers/modelData'
import crew from './reducers/crew'

const malifauxApp = combineReducers({
  modelData,
  crewOptions,
  crew
})

export default malifauxApp
