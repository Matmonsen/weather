import {combineReducers} from 'redux';
import footerReducer from './reducers/footer';
import languageReducer from './reducers/language';
import settingsReducer from "./reducers/settings";
import loadingReducer from "./reducers/loading";
import searchReducer from "./reducers/search";
import weatherDataReducer from "./reducers/weatherData";

const reducers = combineReducers({
    footer: footerReducer,
    language: languageReducer,
    settings: settingsReducer,
    search: searchReducer,
    loading: loadingReducer,
    weatherData: weatherDataReducer
});



export default reducers;