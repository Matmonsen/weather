import {Language} from "../actionTypes";
import {Languages} from "../../config/index";

const initialState = {current: getDefaultLanguage()};

/**
 * Sets the default language based on the browser language
 * @returns {string}
 */
function getDefaultLanguage() {
    let language = 'en';
    for (let lang in Languages) {
        if (window.navigator.language.indexOf(Languages[lang]) !== -1) {
            language = Languages[lang];
        }
    }
    return language;
}


function languageReducer(state = initialState, action) {
    switch (action.type) {
        case Language.SWITCH:
            return {...state, current: action.language};
        default:
            return state;
    }
}

export default languageReducer;