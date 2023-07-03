// addressActions.js
import axios from '../../api/axios';

// Action Types
export const CREATE_ADDRESS_REQUEST = 'CREATE_ADDRESS_REQUEST';
export const CREATE_ADDRESS_SUCCESS = 'CREATE_ADDRESS_SUCCESS';
export const CREATE_ADDRESS_FAILURE = 'CREATE_ADDRESS_FAILURE';
export const GET_ALL_ADDRESSES_REQUEST = 'GET_ALL_ADDRESSES_REQUEST';
export const GET_ALL_ADDRESSES_SUCCESS = 'GET_ALL_ADDRESSES_SUCCESS';
export const GET_ALL_ADDRESSES_FAILURE = 'GET_ALL_ADDRESSES_FAILURE';
export const GET_ADDRESS_REQUEST = 'GET_ADDRESS_REQUEST';
export const GET_ADDRESS_SUCCESS = 'GET_ADDRESS_SUCCESS';
export const GET_ADDRESS_FAILURE = 'GET_ADDRESS_FAILURE';
export const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE';


// Action Creators
export const createAddressRequest = () => {
    return {
        type: CREATE_ADDRESS_REQUEST,
    };
};

export const createAddressSuccess = (address) => {
    return {
        type: CREATE_ADDRESS_SUCCESS,
        payload: address,
    };
};

export const createAddressFailure = (error) => {
    return {
        type: CREATE_ADDRESS_FAILURE,
        payload: error,
    };
};

// Async Action
export const createAddress = (addressData) => {
    return (dispatch) => {
        dispatch(createAddressRequest());

        return axios
            .post('/api/v1/address', addressData)
            .then((response) => {
                const address = response.data;
                dispatch(createAddressSuccess(address));
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.error || 'Failed to create address';
                dispatch(createAddressFailure(errorMessage));
            });
    };
};

export const getAllAddresses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_ADDRESSES_REQUEST });
        const { UserLogin } = getState();
        const { userInfo: {
            user
        } } = UserLogin
        const response = await axios.get(`/api/v1/address/user/${user._id}`);
        const addresses = response.data;

        dispatch({
            type: GET_ALL_ADDRESSES_SUCCESS,
            payload: addresses,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_ADDRESSES_FAILURE,
            payload: error.message,
        });
    }
};
export const getAddressRequest = () => {
    return {
        type: GET_ADDRESS_REQUEST,
    };
};

export const getAddressSuccess = (address) => {
    return {
        type: GET_ADDRESS_SUCCESS,
        payload: address,
    };
};

export const getAddressFailure = (error) => {
    return {
        type: GET_ADDRESS_FAILURE,
        payload: error,
    };
};

export const getAddressById = (id) => async (dispatch) => {
    try {
        dispatch(getAddressRequest());
        const response = await axios.get(`/api/v1/address/${id}`);
        const address = response.data;
        dispatch(getAddressSuccess(address));
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Failed to get address';
        dispatch(getAddressFailure(errorMessage));
    }
};

export const updateAddressRequest = () => {
    return {
        type: UPDATE_ADDRESS_REQUEST,
    };
};

export const updateAddressSuccess = (address) => {
    return {
        type: UPDATE_ADDRESS_SUCCESS,
        payload: address,
    };
};

export const updateAddressFailure = (error) => {
    return {
        type: UPDATE_ADDRESS_FAILURE,
        payload: error,
    };
};

export const updateAddress = (id, updatedData) => async (dispatch) => {
    try {
        dispatch(updateAddressRequest());
        const response = await axios.put(`/api/v1/address/${id}`, updatedData);
        const updatedAddress = response.data;
        dispatch(updateAddressSuccess(updatedAddress));
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Failed to update address';
        dispatch(updateAddressFailure(errorMessage));
    }
};
