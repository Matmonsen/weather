import {FooterFilter} from './../actionTypes';

const initialState = {
    show: false
};


function footerReducer(state = initialState, action) {
    switch (action.type) {
        case FooterFilter.SHOW_CREDIT:
            return {...state, show: true};
        case FooterFilter.HIDE_CREDIT:
            return {...state, show: false};
        default:
            return state;
    }
}

export default footerReducer;