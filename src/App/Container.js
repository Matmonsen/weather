import App from './Component';
import {connect} from "react-redux";
import {updateErrorMessage ,updateSearchQuery} from "../redux/actions/search";
import {getSearchQuery, loadDataInBackground, currentPathRequireWeatherData, searchQueryIsValid} from "../utils/utils";
import {Routes} from "../routing/routes";
import {reportGoogleAnalyticsEvent, GoogleAnalyticsEventKeys} from "../utils/googleAnalytics";
import {withRouter} from "react-router";

const mapStateToProps = (state, ownProps) => {
    let query = getSearchQuery(state.settings.location);

    if (query === "//" || query === "///")
        query = "";
    return {
        loading: state.loading.isLoading,
        lastModified: state.weatherData.week.lastModified,
        language: state.language.current,
        refreshRate: state.settings.general.refresh,
        searchQuery: query

    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: (language, location) => {
            dispatch(updateSearchQuery(location));
            dispatch(updateErrorMessage());

            if (searchQueryIsValid(location))
                reportGoogleAnalyticsEvent(GoogleAnalyticsEventKeys.SavedLocation, location);

            loadDataInBackground(language, location, ownProps.router, dispatch, null, () => {
                // Checks whether the user is on a page requiring weather data or not
                if (currentPathRequireWeatherData(ownProps.router.location.pathname))
                    ownProps.router.push(Routes.search.push)
            });
        },

        reLoad: (language, location) => {
            loadDataInBackground(language, location, ownProps.router, dispatch);
        },
    }
};

export const AppContainer = withRouter (connect(mapStateToProps, mapDispatchToProps)(App));
