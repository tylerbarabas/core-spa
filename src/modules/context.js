import { LOGOUT } from './auth'
import Service from '../service'
export const CONTEXT_SELECTED = 'context/CONTEXT_SELECTED'

const initialState = {
  role: null,
  id: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case CONTEXT_SELECTED:
    return {
      ...state,
      role: action.role,
      id: action.id,
    }
  case LOGOUT:
    return initialState
  default:
    return state
  }
}

export const selectContext = (role, id) => {
  Service.setContextCookie(role, id)
  return dispatch => {
    dispatch({
      type: CONTEXT_SELECTED,
      role,
      id,
    })
  }
}
