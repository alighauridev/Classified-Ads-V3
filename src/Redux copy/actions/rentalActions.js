import { SET_RENTAL_DETAILS } from '../constants/carsConstants';

export function setRentalDetails(details) {
    return { type: SET_RENTAL_DETAILS, payload: details };
}