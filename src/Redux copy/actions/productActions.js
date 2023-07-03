import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { FETCH_CARS_FAILURE, FETCH_CARS_REQUEST, FETCH_CARS_SUCCESS } from "../constants/carsConstants";

export const getProducts =
    (filter = {}, page = 1, limit = 10, currency = "USD") =>
        async (dispatch, getState) => {
            try {
                dispatch({
                    type: PRODUCT_LIST_REQUEST,
                });
                const token = localStorage.getItem("@accessToken");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await axios.post(
                    "/ads/getall",
                    {
                        filter: filter,
                        page: page,
                        limit: limit,
                        currency: currency
                    },
                    config
                );
                console.log(data);
                dispatch({
                    type: PRODUCT_LIST_SUCCESS,
                    payload: data,
                });
            } catch (error) {
                dispatch({
                    type: PRODUCT_LIST_FAIL,
                    payload:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
                });
            }
        };

export const getSingleProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createNoteAction =
    (title, content, category) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PRODUCT_CREATE_REQUEST,
            });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(
                `/api/notes/create`,
                { title, content, category },
                config
            );

            dispatch({
                type: PRODUCT_CREATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({
                type: PRODUCT_CREATE_FAIL,
                payload: message,
            });
        }
    };

export const deleteNoteAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`/api/notes/${id}`, config);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message,
        });
    }
};

export const updateNoteAction =
    (id, title, content, category) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PRODUCT_UPDATE_REQUEST,
            });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                `/api/notes/${id}`,
                { title, content, category },
                config
            );

            dispatch({
                type: PRODUCT_UPDATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({
                type: PRODUCT_UPDATE_FAIL,
                payload: message,
            });
        }
    };

export const createReviewAction =
    (productId, review) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PRODUCT_CREATE_REVIEW_REQUEST,
            });

            const {
                UserLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            axios.post(`/api/products/${productId}/review`, review, config);

            dispatch({
                type: PRODUCT_CREATE_REVIEW_SUCCESS,
            });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({
                type: PRODUCT_CREATE_REVIEW_FAIL,
                payload: message,
            });
            toast.error("already reviewd Submited!");
        }
    };
