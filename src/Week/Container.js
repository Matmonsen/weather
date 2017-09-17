import { connect } from 'react-redux'
import Week from "./Component";
import {FooterFilter} from "../redux/actionTypes";
import {setFooterVisibliity} from "../redux/actions";
import {redirectToSearch} from "../utils/utils";

/**
 * Redux method. Maps Redux store state to props.
 * @param state
 * @returns {{meta, forecast}}
 */
const mapStateToProps = (state, ownProps) => {

    let location = "";
    if (state.weatherData.week.meta != null)
        location = state.weatherData.week.meta.location;

    return {

        forecasts: state.weatherData.week.forecasts,
        location: location,
        lastModified: state.weatherData.week.lastModified,
        language: state.language.current,
        loading: state.loading.isLoading,
        loadingMessage: state.loading.message,
    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showFooter: () => dispatch(setFooterVisibliity(FooterFilter.SHOW_CREDIT)),
        hideFooter: () => dispatch(setFooterVisibliity(FooterFilter.HIDE_CREDIT)),
        redirectToSearch: () => {
            redirectToSearch(dispatch, ownProps.router);
        }
    }
};

export const WeekContainer = connect(mapStateToProps, mapDispatchToProps)(Week);