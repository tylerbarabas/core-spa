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
    console.log(state);
    console.log(action);
    switch (action.type) {
        case TOKEN_REQUESTED:
            return {
                ...state,
                isRequesting: true,
            }

        case TOKEN_SUCCESS:
            return {
                ...state,
                isRequesting: false,
            }

        case TOKEN_FAIL:
            return {
                ...state,
                isRequesting: false,
            }

        default:
            return state
    }
}

export const requestToken = () => {
    return dispatch => {

        dispatch({
            type: TOKEN_REQUESTED
        })

        return Service.getAuthToken().then(res => {
            dispatch({
                type: TOKEN_SUCCESS
            })
        }).catch(()=>{
             dispatch({
                type: TOKEN_FAIL
            })           
        });
    }
}
