import Service from '../service'

export const USER_REQUESTED = 'auth/USER_REQUESTED'
export const USER_SUCCESS = 'auth/USER_SUCCESS'
export const USER_FAIL = 'auth/USER_FAIL'

const initialState = {
    name: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUESTED:
            return {
                ...state
            }

        case USER_SUCCESS:
            return {
                ...state,
            }

        case USER_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}

export const getMyUser = () => {
    return dispatch => {

        dispatch({
            type: USER_REQUESTED
        })

        return Service.getAuthToken(email, password, remember).then(async res => {
            if (!res.hasOwnProperty('error')) {
                dispatch({
                    type: USER_SUCCESS
                })
            } else {
                dispatch({
                    type: USER_FAIL,
                })
            }
        }).catch(res => {
            dispatch({
                type: USER_FAIL,
            }) 
        })
    }
}
