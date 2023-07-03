import { SHOW_LOADER, HIDE_LOADER } from '../actions/loading';

const initialState = {
    loading: false
};

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return { loading: true };
        case HIDE_LOADER:
            return { loading: false };
        default:
            return state;
    }
};

export default loadingReducer;
