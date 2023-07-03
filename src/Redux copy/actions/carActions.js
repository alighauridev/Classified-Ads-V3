import { FETCH_CARS_FAILURE, FETCH_CARS_REQUEST, FETCH_CARS_SUCCESS } from "../constants/carsConstants";
import axios from "../../api/axios"
export const fetchCars = (
    carType = '',
    carBrand = '',
    maxPeople = '',
    category = '',
    numDoors = '',
    minPricePerDay = 0,
    maxPricePerDay = 1500,
    // minPricePerHour = 0,
    // maxPricePerHour = 150,
    hasDiscount = '',
    carYear = '',
    page = 1,
    isFav = false
) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_CARS_REQUEST });

        const {
            UserLogin: { userInfo },
        } = getState();
        const {
            toggle: { toggle },
        } = getState();
        try {
            if (userInfo) {
                const { data } = await axios.post(
                    `/api/v1/cars/all?&category=${carType}&carBrand=${carBrand}&maxPeople=${maxPeople}&numDoors=${numDoors}&minPricePerDay=${parseInt(minPricePerDay)}&maxPricePerDay=${parseInt(maxPricePerDay)}&hasDiscount=${hasDiscount}&carYear=${carYear}&page=${page}&favorites=${toggle}`, { user: userInfo?.user._id }
                );
                dispatch({ type: FETCH_CARS_SUCCESS, payload: data });
            }
            else {
                const { data } = await axios.post(
                    `/api/v1/cars/all?&category=${carType}&carBrand=${carBrand}&maxPeople=${maxPeople}&numDoors=${numDoors}&minPricePerDay=${parseInt(minPricePerDay)}&maxPricePerDay=${parseInt(maxPricePerDay)}&hasDiscount=${hasDiscount}&carYear=${carYear}&page=${page}`,
                );
                dispatch({ type: FETCH_CARS_SUCCESS, payload: data });
            }


        } catch (error) {
            dispatch({
                type: FETCH_CARS_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };
};
export const toggleAction = () => {
    return {
        type: 'TOGGLE',
    };
};