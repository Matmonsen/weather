import { connect } from 'react-redux'
import Hour from "./Component";
import {FooterFilter} from "../redux/actionTypes";
import {setFooterVisibliity} from "../redux/actions";
import {redirectToSearch} from "../utils/utils";


const mapStateToProps = (state, ownProps) => {

    let location = "";
    if (state.weatherData.hour.meta != null)
        location = state.weatherData.hour.meta.location;

    return {
        forecasts: state.weatherData.hour.forecasts,
        location: location,
        lastModified: state.weatherData.hour.lastModified,
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

export const HourContainer = connect(mapStateToProps, mapDispatchToProps)(Hour);