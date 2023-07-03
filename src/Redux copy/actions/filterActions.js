// filterActions.js
import axios from '../../api/axios';
import { FILTER_REQUEST, FILTER_SUCCESS, FILTER_FAILURE } from '../constants/filtersTypes';

export const fetchFilters = () => {
    return (dispatch) => {
        dispatch(fetchFiltersRequest())
        axios
            .get('/api/v1/cars/filters')
            .then(response => {
                const filters = response.data
                dispatch(fetchFiltersSuccess(filters))
            })
            .catch(error => {
                dispatch(fetchFiltersFailure(error.message))
            })
    }
}

export const fetchFiltersRequest = () => {
    return {
        type: FILTER_REQUEST
    }
}

export const fetchFiltersSuccess = filters => {
    return {
        type: FILTER_SUCCESS,
        payload: filters
    }
}

export const fetchFiltersFailure = error => {
    return {
        type: FILTER_FAILURE,
        payload: error
    }
}
