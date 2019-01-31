import { LOGOUT } from './auth'
import Service from '../service'
export const CONTEXT_SELECTED = 'context/CONTEXT_SELECTED'

const initialState = {
  id: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case CONTEXT_SELECTED:
    return {
      ...state,
      id: action.id,
    }
  case LOGOUT:
    return initialState
  default:
    return state
  }
}

export const selectContext = ({ id }) => {
  Service.setContextCookie(id)
  return dispatch => {
    dispatch({
      type: CONTEXT_SELECTED,
      id,
    })
  }
}
