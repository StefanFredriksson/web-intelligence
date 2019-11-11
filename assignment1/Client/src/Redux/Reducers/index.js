import { combineReducers } from 'redux'
import euclidianReducer from './euclidianReducer'

export default combineReducers({
  euclidian: euclidianReducer
})
