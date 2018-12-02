import Service from '../service'

export const USER_REQUESTED = 'auth/USER_REQUESTED'
export const USER_SUCCESS = 'auth/USER_SUCCESS'
export const USER_FAIL = 'auth/USER_FAIL'
export const BRANDS_REQUESTED = 'auth/BRANDS_REQUESTED'
export const BRANDS_SUCCESS = 'auth/BRANDS_SUCCESS'
export const BRANDS_FAIL = 'auth/BRANDS_FAIL'
export const RETAILERS_REQUESTED = 'auth/RETAILERS_REQUESTED'
export const RETAILERS_SUCCESS = 'auth/RETAILERS_SUCCESS'
export const RETAILERS_FAIL = 'auth/RETAILERS_FAIL'



const initialState = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    isRevcascade: null,
    retailers: [],
    brands: [],
    isRequesting: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUESTED:
            return {
                ...state,
                isRequesting: true,
            }

        case USER_SUCCESS:
            return {
                ...state,
                id: action.id, 
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                isRevcascade: action.isRevcascade,
                brands: action.brands,
                retailers: action.retailers,
                isRequesting: false,
            }

        case USER_FAIL:
            return {
                ...state,
                isRequesting: false,
            }

        case RETAILERS_REQUESTED:
            return {
                ...state,
                isRequesting: true,
            }

        case RETAILERS_SUCCESS:
            return {
                ...state,
                retailers: action.retailers,
                isRequesting: false,
            }

        case BRANDS_FAIL:
            return {
                ...state,
                isRequesting: false,
            }
        case BRANDS_REQUESTED:
            return {
                ...state,
                isRequesting: true
            }

        case BRANDS_SUCCESS:
            return {
                ...state,
                brands: action.brands,
                isRequesting: false,
            }

        case RETAILERS_FAIL:
            return {
                ...state,
                isRequesting: false,
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
                console.log('data', data); 
                dispatch({
                    type: USER_SUCCESS,
                    id: data.id,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    isRevcascade: data.is_revcascade,
                    brands: data.brands || [],
                    retailers: data.retailers || [],
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

export const getMyBrands = () => {
    return dispatch => {

        dispatch({
            type: BRANDS_REQUESTED
        })

        return Service.getMyBrands().then(async res => {
            if (res.ok) {
                let data = await res.json();
                dispatch({
                    type: BRANDS_SUCCESS,
                    brands: data.results || [],
                })
            } else {
                dispatch({
                    type: BRANDS_FAIL,
                })
            }
        }).catch(res => {
            dispatch({
                type: BRANDS_FAIL,
            }) 
        })
    }
};

export const getMyRetailers = () => {
    return dispatch => {

        dispatch({
            type: RETAILERS_REQUESTED
        })

        return Service.getMyRetailers().then(async res => {
            if (res.ok) {
                let data = await res.json();
                dispatch({
                    type: RETAILERS_SUCCESS,
                    brands: data.results || [],
                })
            } else {
                dispatch({
                    type: RETAILERS_FAIL,
                })
            }
        }).catch(res => {
            dispatch({
                type: RETAILERS_FAIL,
            }) 
        })
    }
};
