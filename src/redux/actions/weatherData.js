import {WeatherData} from "../actionTypes";

export function fetchWeekly(data) {

    return {
        type: WeatherData.WEEKLY,
        payload: data
    }
}


export function fetchHourly(data) {

    return {
        type: WeatherData.HOURLY,
        payload: data
    }
}
