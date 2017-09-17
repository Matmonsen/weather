import {WeatherData} from "../actionTypes";

const initialState = {
    week: {
        forecasts: [],
        meta: null,
        lastModified: null
    },
    hour: {
        forecasts: [],
        meta: null,
        lastModified: null
    }
};

export default function weatherDataReducer(state = initialState, action) {
    switch(action.type) {
        case WeatherData.WEEKLY:
            return { ...state, week: action.payload, hour: state.hour};
        case WeatherData.HOURLY:
            return { ...state, week: state.week, hour: action.payload};
        default:
            return state;

    }
}