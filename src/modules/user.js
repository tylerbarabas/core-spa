import Service from '../service'

import { LOGOUT } from './auth'

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
    isError: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUESTED:
            return {
                ...state,
                isRequesting: true,
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
                brands: action.brands,
                retailers: action.retailers,
                isRequesting: false,
                isError: false,
            }

        case USER_FAIL:
            return {
                ...state,
                isRequesting: false,
                isError: true,
            }

        case LOGOUT:
            return initialState;

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

                if (!data.isRevcascade) {
                    data.brands = [];
                    data.retailers = [];

                    let brandsRes = await Service.getMyBrands();
                    if (brandsRes.ok) {
                        let brandsData = await brandsRes.json();
                        data.brands = brandsData.results;
                    }

                    let retailersRes = await Service.getMyRetailers();
                    if (retailersRes.ok) {
                        let retailersData = await retailersRes.json();
                        data.retailers = retailersData.results;
                    }
                }

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
