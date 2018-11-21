import Service from '../service'

export const AUTH_REQUESTED = 'token/AUTH_REQUESTED'
export const AUTH_SUCCESS = 'token/AUTH_SUCCESS'
export const AUTH_FAIL = 'token/AUTH_FAIL'

const initialState = {
    accessToken: null,
    tokenType: null,
    isRequesting: false,
    errorMsg: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUESTED:
            return {
                ...state,
                isRequesting: true,
                errorMsg: null
            }

        case AUTH_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                errorMsg: null,
                accessToken: action.accessToken
            }

        case AUTH_FAIL:
            return {
                ...state,
                isRequesting: false,
                errorMsg: action.errorMsg
            }

        default:
            return state
    }
}

export const requestToken = (email, password) => {
    return dispatch => {

        dispatch({
            type: AUTH_REQUESTED
        })

        return Service.getAuthToken(email, password).then(res => {
            if (!res.hasOwnProperty('error')) {
                dispatch({
                    type: AUTH_SUCCESS,
                    accessToken: res.access_token,
                    tokenType: res.token_type,
                })
            } else {
                dispatch({
                    type: AUTH_FAIL,
                    errorMsg: res.error_description
                })
            }
        }).catch(res => {
            dispatch({
                type: AUTH_FAIL,
                errorMsg: res.error_description
            }) 
        });
    }
}
