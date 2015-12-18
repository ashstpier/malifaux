import { combineReducers } from 'redux'
import modelData from './reducers/modelData'
import crewOptions from './reducers/crewOptions'
import crewList from './reducers/crewList'

const malifauxApp = combineReducers({
  modelData,
  crewOptions,
  crewList
})

export default malifauxApp
