// reducers/favoriteReducers.js

import {
    ADD_FAVORITE_REQUEST,
    ADD_FAVORITE_SUCCESS,
    ADD_FAVORITE_FAILURE,
    REMOVE_FAVORITE_REQUEST,
    REMOVE_FAVORITE_SUCCESS,
    REMOVE_FAVORITE_FAILURE,
    GET_FAVORITES_REQUEST,
    GET_FAVORITES_SUCCESS,
    GET_FAVORITES_FAILURE,
} from '../constants/favouriteConstants';

// Initial state
const initialState = {
    loading: false,
    favorites: [],
    error: null,
    message: '',
};

// Reducer
const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVORITE_REQUEST:
        case REMOVE_FAVORITE_REQUEST:
        case GET_FAVORITES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: '',
            };
        case ADD_FAVORITE_SUCCESS:
        case REMOVE_FAVORITE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case ADD_FAVORITE_FAILURE:
        case REMOVE_FAVORITE_FAILURE:
        case GET_FAVORITES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_FAVORITES_SUCCESS:
            return {
                ...state,
                loading: false,
                favorites: action.payload,
            };
        default:
            return state;
    }
};

export default favoriteReducer;
