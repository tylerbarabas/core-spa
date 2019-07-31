import Service from '../service'

import { LOGOUT } from './auth'

export const VL_REQUESTED = 'vl/VL_REQUESTED'
export const VL_SUCCESS = 'vl/VL_SUCCESS'
export const VL_FAIL = 'vl/VL_FAIL'
export const VL_UPDATE_FILTER = 'vl/VL_UPDATE_FILTER'

const initialState = {
  isRequesting: false,
  isError: false,
  all: [],
  filtered: []
}

export default (state = initialState, action) => {
  switch (action.type) {
  case VL_REQUESTED:
    return {
      ...state,
      isRequesting: true,
      isError: false,
      all: [],
      filtered: [],
    }

  case VL_SUCCESS:
    return {
      ...state,
      isRequesting: false,
      isError: false,
      all: action.all,
      filtered: action.all.slice(0,10),
    }

  case VL_FAIL:
    return {
      ...state,
      isRequesting: false,
      isError: true,
      all: [],
      importsFiltered: [],
    }

  case VL_UPDATE_FILTER:
    return {
      ...state,
      filtered: action.filtered,
    }

  case LOGOUT:
    return initialState

  default:
    return state
  }
}

export const getVendorList = id => {
  return dispatch => {
    dispatch({
      type: VL_REQUESTED,
    })

    return Service.getVendorList(id).then(data=>{
      if (typeof data.results === 'object') {
        dispatch({
          type: VL_SUCCESS,
          all: data.results,        
        })
      } else {
        dispatch({
          type: VL_FAIL,
        })
      }
    })
  }
}

export const updateVendorListFilter = filtered => {
  return dispatch => {
    dispatch({
      type: VL_UPDATE_FILTER,
      filtered,
    })
  }
}
