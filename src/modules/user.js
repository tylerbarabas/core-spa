import Service from '../service'

export const USER_REQUESTED = 'auth/USER_REQUESTED'
export const USER_SUCCESS = 'auth/USER_SUCCESS'
export const USER_FAIL = 'auth/USER_FAIL'

const initialState = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    isRevcascade: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUESTED:
            return {
                ...state,
            }

        case USER_SUCCESS:
            return {
                ...state,
                id: action.id, 
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                isRevcascade: action.isRevcascade,
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

        return Service.getMyUser().then(async res => {
            if (!res.hasOwnProperty('error')) {
                dispatch({
                    type: USER_SUCCESS,
                    id: res.id,
                    firstName: res.first_name,
                    lastName: res.last_name,
                    email: res.email,
                    isRevcascade: res.is_revcascade,
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
