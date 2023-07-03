// filterReducer.js
import { FILTER_REQUEST, FILTER_SUCCESS, FILTER_FAILURE } from '../constants/filtersTypes';

const initialState = {
    loading: false,
    filters: {},
    error: ''
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FILTER_SUCCESS:
            return {
                loading: false,
                filters: action.payload,
                error: ''
            }
        case FILTER_FAILURE:
            return {
                loading: false,
                filters: {},
                error: action.payload
            }
        default: return state
    }
}

export default filterReducer;
