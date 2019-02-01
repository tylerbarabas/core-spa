import { LOGOUT } from './auth'
import Service from '../service'
export const CONTEXT_SELECTED = 'context/CONTEXT_SELECTED'

const initialState = {
  uuid: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case CONTEXT_SELECTED:
    return {
      ...state,
      uuid: action.uuid,
    }
  case LOGOUT:
    return initialState
  default:
    return state
  }
}

export const selectContext = ({ uuid }) => {
  Service.setContextCookie(uuid)
  return dispatch => {
    dispatch({
      type: CONTEXT_SELECTED,
      uuid,
    })
  }
}
