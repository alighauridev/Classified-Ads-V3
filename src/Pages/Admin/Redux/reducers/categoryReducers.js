// categoryReducers.js

import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    CREATE_SUBCATEGORY_REQUEST,
    CREATE_SUBCATEGORY_SUCCESS,
    CREATE_SUBCATEGORY_FAIL,
    DELETE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAIL,
    CATEGORY_WITH_SUBCATEGORIES_REQUEST,
    CATEGORY_WITH_SUBCATEGORIES_SUCCESS,
    CATEGORY_WITH_SUBCATEGORIES_FAIL,
} from '../constants/categoryConstants';

export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categories: [] };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Other reducers such as categoryDetailsReducer, createCategoryReducer, updateCategoryReducer, deleteCategoryReducer, createSubcategoryReducer, deleteSubcategoryReducer, categoryWithSubcategoriesReducer can be implemented following a similar pattern.

// ...
