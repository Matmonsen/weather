import {Search} from "../actionTypes";
const inistialState = {
    query: "",
    errorMessage: ""
};

function searchReducer(state = inistialState, action) {
    switch (action.type) {
        case Search.SET_ERRORMESSAGE:
            return {...state, query: state.query, errorMessage: action.payload};
        case Search.SET_SEARCHQUREY:
            return {...state, query: action.payload, errorMessage: state.errorMessage};
        default:
            return state
    }
}

export default searchReducer;