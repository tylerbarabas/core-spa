import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import context from './context'

export default combineReducers({
  auth,
  user,
  context
})
