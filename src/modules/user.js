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
    isError: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUESTED:
            return {
                ...state,
                isError: false,
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
                isError: true
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
            if (res.ok) {
                let data = await res.json();
                dispatch({
                    type: USER_SUCCESS,
                    id: data.id,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    isRevcascade: data.is_revcascade,
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
