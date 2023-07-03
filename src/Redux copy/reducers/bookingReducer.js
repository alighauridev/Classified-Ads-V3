import {
    BOOKING_CREATE_FAIL,
    BOOKING_CREATE_REQUEST,
    BOOKING_CREATE_SUCCESS,
    BOOKING_LIST_FAIL,
    BOOKING_LIST_REQUEST,
    BOOKING_LIST_SUCCESS,
} from "../constants/bookingConstants";

export const bookingCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BOOKING_CREATE_REQUEST:
            return { loading: true };
        case BOOKING_CREATE_SUCCESS:
            return { loading: false, success: true, booking: action.payload };
        case BOOKING_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const getUserBookingsReducer = (state = { bookingsByStatus: {} }, action) => {
    switch (action.type) {
        case BOOKING_LIST_REQUEST:
            return { loading: true };
        case BOOKING_LIST_SUCCESS:
            return { loading: false, bookingsByStatus: action.payload };
        case BOOKING_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// ... Implement other reducers similarly ...
