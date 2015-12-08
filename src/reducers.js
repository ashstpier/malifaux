import { combineReducers } from 'redux'
import modelData from './reducers/modelData'
import crew from './reducers/crew'

const malifauxApp = combineReducers({
  modelData,
  crew
})

export default malifauxApp
