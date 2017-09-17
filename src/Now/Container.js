import { connect } from 'react-redux'
import Now from "./Component";
import {findCurrentWeather, redirectToSearch} from "../utils/utils";
import {setFooterVisibliity} from "../redux/actions";
import {FooterFilter} from "../redux/actionTypes";


/**
 * Redux method. Maps Redux store state to props.
 * @param state
 * @returns {{meta, forecast}}
 */
function mapStateToProps(state) {
    let location = {};
    if (state.weatherData.week.meta != null)
        location = state.weatherData.week.meta.location;

    return {
        forecast: findCurrentWeather(state.weatherData.week.forecasts, state.language.current),
        lastModified: state.weatherData.week.lastModified,
        location: location,
        language: state.language.current,
        loading: state.loading.isLoading,
        loadingMessage: state.loading.message,

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showFooter: () => dispatch(setFooterVisibliity(FooterFilter.SHOW_CREDIT)),
        hideFooter: () => dispatch(setFooterVisibliity(FooterFilter.HIDE_CREDIT)),
        redirectToSearch: () => {
            redirectToSearch(dispatch, ownProps.router);
        }
    }
};

export const NowContainer = connect(mapStateToProps,mapDispatchToProps)(Now);
