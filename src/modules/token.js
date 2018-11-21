import Service from '../service'

export const TOKEN_REQUESTED = 'token/TOKEN_REQUESTED'
export const TOKEN_SUCCESS = 'token/TOKEN_SUCCESS'
export const TOKEN_FAIL = 'token/TOKEN_FAIL'

const initialState = {
    accessToken: null,
    tokenType: null,
    isRequesting: false,
    errorMsg: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TOKEN_REQUESTED:
            return {
                ...state,
                isRequesting: true,
                errorMsg: null
            }

        case TOKEN_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                errorMsg: null,
                accessToken: action.accessToken
            }

        case TOKEN_FAIL:
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
            type: TOKEN_REQUESTED
        })

        return Service.getAuthToken(email, password).then(res => {
            if (!res.hasOwnProperty('error')) {
                dispatch({
                    type: TOKEN_SUCCESS,
                    accessToken: res.access_token,
                    tokenType: res.token_type,
                })
            } else {
                dispatch({
                    type: TOKEN_FAIL,
                    errorMsg: res.error_description
                })
            }
        }).catch(res => {
            dispatch({
                type: TOKEN_FAIL,
                errorMsg: res.error_description
            }) 
        });
    }
}
