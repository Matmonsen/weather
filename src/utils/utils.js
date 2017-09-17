import moment from 'moment';
import {Routes} from "../routing/routes";
import {fetchWeekly, fetchHourly} from "../redux/actions/weatherData";
import {ForecastTypes, Api} from "../config";
import axios from "axios";
import {stopLoading, startLoading} from "../redux/actions/loading";
import {updateSearchQuery, updateErrorMessage} from "../redux/actions/search";
import {Translate} from "../i18n/index";
import {reportGoogleAnalyticsEvent, GoogleAnalyticsEventKeys} from "./googleAnalytics";


/**
 * Finds the current weather from an array of forecasts.
 * @param arrayOfForecasts
 * @param lang current language
 * @returns {*}
 */
export function findCurrentWeather(arrayOfForecasts, lang) {
    if (typeof arrayOfForecasts === "undefined" || arrayOfForecasts.length === 0)
        return null;
    let currentForecast = null;

    let todaysForecastIndex = arrayOfForecasts.map(function(d) { return d['weekday']; }).indexOf(capitilizeFirst(moment().locale(lang).format("dddd")));

    if (todaysForecastIndex == -1)
        return null;

    for(let forecasts of arrayOfForecasts[todaysForecastIndex].forecast) {

        currentForecast = currentForecast === null ? forecasts : currentForecast;
        if (forecasts !== null && currentForecast !== null && moment(forecasts.start).isBefore(currentForecast.start))
            currentForecast = forecasts;
    }
    return currentForecast;

}

function capitilizeFirst(lang) {
    return lang.substring(0, 1).toUpperCase() + lang.substring(1, lang.length);
}

/**
 * Parses a location object containing country, county, city and area keys to a valid or empty Search query.
 * @param location The location being parsed to a Search query.
 * @returns {*}
 */
export function getSearchQuery(location) {

    let query = "";

    if (typeof location === "undefined" || typeof location.country === "undefined" || typeof location.county === "undefined" || typeof location.city === "undefined")
        return query;

    query = `${location.country}/${location.county}/${location.city}`;

    if (typeof location.area !== "undefined" && location.area !== "")
        query += `/${location.area}`;

    return query;
}

/**
 * Capitalizes a word
 * @param word
 */
export function capitalizedWord(word) {
    return word.replace(/\b\w/g, (string) => {
        return string.toUpperCase()
    });
}

export function currentPathRequireWeatherData(currentPath) {
    return currentPath.indexOf(Routes.settings.url) === -1 && currentPath.indexOf(Routes.search.url) === -1 && currentPath.indexOf(Routes.about.url) === -1 && currentPath.indexOf(Routes.cookies.url) === -1;
}

/**
 * Tests weather a string is a valid Search query
 * @param query Search query
 * @returns {boolean} Result
 */
export function searchQueryIsValid(query) {
    let elements = query.split("/");
    return (elements.length === 3 || elements.length === 4)
        && elements[0].length > 0
        && elements[1].length > 0
        && elements[2].length > 0;
}

/**
 * Loads all necessary weather data in the background
 *
 * @param language The requested source language of the forecast
 * @param location The requested location of the forecast
 * @param router The react-router for navigation
 * @param dispatch Dispatch callback to update Redux storage.
 */
export function loadDataInBackground (language, location, router,  dispatch, callbackSuccess = null, callbackFail = null) {

    if (typeof router === "undefined")
        return;
    let currentLocation = router.route.location.pathname;
    // We always want to fetch weekly data first, because all presentations except Hour by Hour relies on it
    let forecastType = ForecastTypes.WEEK;
    if (currentLocation.indexOf(Routes.hour.url) !== -1) {
        forecastType = ForecastTypes.HOURLY;
    }

    // Want to toggle Loading on any page displaying weather data
    if (currentPathRequireWeatherData(currentLocation)) {
        let loadingMessage = "";

        // Sets Loading message
        if (searchQueryIsValid(location)) {
            let place = location.split("/")[location.split("/").length - 1];
            let country = location.split("/")[0];
            loadingMessage = `${Translate[language]["loading"]} ${capitalizedWord(place)} (${capitalizedWord(country)})`;
        }

        dispatch(startLoading(loadingMessage));
    }

    axios(encodeURI(Api.SEARCH + `?location=${location}&language=${language}&forecastType=${forecastType}`))
        .then((response) => {
            if (response.error) {
                reportGoogleAnalyticsEvent(GoogleAnalyticsEventKeys.SearchingError, response);

                if (currentPathRequireWeatherData(currentLocation)) {
                    dispatch(stopLoading());
                }


                if (callbackFail !== null)
                    callbackFail();
            } else {
                if (response.data.success) {

                    if (forecastType === ForecastTypes.HOURLY)
                        dispatch(fetchHourly(response.data.data));
                    else
                        dispatch(fetchWeekly(response.data.data));

                    if (currentPathRequireWeatherData(currentLocation)) {
                        dispatch(stopLoading());
                    }

                    if (callbackSuccess !== null)
                        callbackSuccess();

                    // Want to pull the other kind of forecast (weekly/hourly)
                    let forecastType2 = forecastType === ForecastTypes.WEEK ? ForecastTypes.HOURLY : ForecastTypes.WEEK;
                    axios(Api.SEARCH + `?location=${location}&language=${language}&forecastType=${forecastType2}`)
                        .then((moreResponse) => {
                            if (moreResponse.error) {
                                reportGoogleAnalyticsEvent(GoogleAnalyticsEventKeys.SearchingError, moreResponse);
                            }

                            if (!moreResponse.error && moreResponse.data.success) {

                                if (forecastType2.indexOf(ForecastTypes.HOURLY) !== -1) {
                                    dispatch(fetchHourly(moreResponse.data.data));
                                }
                                else {
                                    dispatch(fetchWeekly(moreResponse.data.data));
                                }
                            }
                        })
                } else {
                    if (currentPathRequireWeatherData(currentLocation)) {
                        dispatch(stopLoading());
                    }
                    if (callbackFail !== null)
                        callbackFail();
                }
            }})
        .catch((err) => {
                reportGoogleAnalyticsEvent(GoogleAnalyticsEventKeys.SearchingError, err);
                redirectToSearch(dispatch, router);
                dispatch(stopLoading())
            });
}


/**
 * Redirects a page to Search since it does not have any content
 * @param dispatch
 * @param router
 */
export function redirectToSearch(dispatch, router) {
    dispatch(stopLoading());
    dispatch(updateSearchQuery());
    dispatch(updateErrorMessage());
    router.push(Routes.search.push);
}


