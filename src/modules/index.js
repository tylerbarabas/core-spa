import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import context from './context'
import notification from './notification'

export default combineReducers({
  auth,
  user,
  context,
  notification,
})
