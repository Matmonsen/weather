import {connect} from "react-redux";
import Search from "./Component";
import {clearErrorMessage} from "../redux/actions/search";

import {updateErrorMessage} from "../redux/actions/search";
import {} from "../routing";
import {fetchHourly} from "../redux/actions/weatherData";
import {ForecastTypes, Api} from "../config";
import axios from "axios";
import {fetchWeekly} from "../redux/actions/weatherData";
import {updateSearchQuery} from "../redux/actions/search";
import {FooterFilter} from "../redux/actionTypes";
import {setFooterVisibliity} from "../redux/actions";
import {stopLoading, startLoading} from "../redux/actions/loading";
import {GoogleAnalyticsEventKeys, reportGoogleAnalyticsEvent} from "../utils/googleAnalytics";
import {Routes} from "../routing/routes";

/**
 * Redux method. Maps Redux store state to props.
 * @param state
 * @returns
 */
function mapStateToProps(state, ownProps) {

    let error = state.search.errorMessage;
    if (state.search.query === "")
        error = "";

    return {
        isLoading: state.loading.isLoading,
        errorMessage: error,
        language: state.language.current,
        prefix: state.settings.prefix,
        loadingMessage: state.loading.message,
    }
}

function mapDispatchToProps(dispatch, ownProps) {

    return {
        reset: () => {
            dispatch(clearErrorMessage());
        },
        search: (location, language,  firstSearch = true, searchAgain = null) => {
            if (firstSearch)
                dispatch(startLoading(`Searching for ${location.split("/")[location.split("/").length - 1]} (${location.split("/")[0]})`));

            axios(encodeURI(Api.SEARCH + `?location=${location}&language=${language}&forecastType=${ForecastTypes.WEEK}`))
                .then((response) => {
                    if (response.error) {
                        reportGoogleAnalyticsEvent(GoogleAnalyticsEventKeys.SearchingError, response);
                        if(firstSearch)
                            dispatch(updateErrorMessage("Her skjedde det en feil.."));
                        dispatch(stopLoading());
                    } else {
                        if (response.data.success) {
                            dispatch(fetchWeekly(response.data.data));
                            console.log("own", ownProps)
                            if (ownProps.location.pathname !== Routes.now.url) {
                                ownProps.history.push(Routes.now.push);
                                reportGoogleAnalyticsEvent(GoogleAnalyticsEventKeys.SearchQuery, location);
                                dispatch(stopLoading());
                            }

                            // Want to pull the other kind of forecast (weekly/hourly)
                            axios(Api.SEARCH + `?location=${location}&language=${language}&forecastType=${ForecastTypes.HOURLY}`)
                                .then((moreResponse) => {
                                    if (moreResponse.error) {
                                        reportGoogleAnalyticsEvent(GoogleAnalyticsEventKeys.SearchingError, response);
                                    }

                                    if (!moreResponse.error && moreResponse.data.success) {
                                        dispatch(fetchHourly(moreResponse.data.data));
                                    }
                                })
                        } else {
                            if(searchAgain === null) {
                                dispatch(updateErrorMessage(response.data.message));
                                dispatch(stopLoading());
                            } else
                                searchAgain();
                        }
                    }})
                .catch((err) => {
                    reportGoogleAnalyticsEvent(GoogleAnalyticsEventKeys.SearchingError, err);
                    dispatch(stopLoading());
                })
        },
        hideFooter: () => dispatch(setFooterVisibliity(FooterFilter.HIDE_CREDIT)),
        updateSearchQuery: (query) => dispatch(updateSearchQuery(query)),
        stopLoading: () => dispatch(stopLoading()),
    }
}

export const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);
