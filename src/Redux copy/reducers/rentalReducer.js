// reducer.js
import { SET_RENTAL_DETAILS } from '../constants/carsConstants';

const initialState = {
    pickupLocation: '',
    returnLocation: '',
    pickupTime: '',
    returnTime: '',
    perDay: true,
    perHour: false,
    selectedOption: "perDay"
};

export const rentalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RENTAL_DETAILS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

