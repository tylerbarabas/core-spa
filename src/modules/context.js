import { LOGOUT } from './auth'
export const CONTEXT_SELECTED = 'context/CONTEXT_SELECTED'

const initialState = {
  id: null,
  name: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case CONTEXT_SELECTED:
    return {
      ...state,
      id: action.id,
      name: action.name
    }
  case LOGOUT:
    return initialState
  default:
    return state
  }
}

export const selectContext = ({ id, name }) => {
  return dispatch => {
    dispatch({
      type: CONTEXT_SELECTED,
      id,
      name
    })
  }
}
