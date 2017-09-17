import {Loading} from "../actionTypes";

const initialState = {isLoading: false, message: ""};

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case Loading.START:
            return {...state, isLoading: true,message: action.payload};
        case Loading.STOP:
            return {...state, isLoading: false, message: ""};
        default:
            return state
    }
};

export default loadingReducer