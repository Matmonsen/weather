import {connect} from 'react-redux';
import Footer from "./Component";

/**
 * Redux method. Maps Redux store state to props.
 * @param state
 * @returns {{meta, forecast}}
 */
function mapStateToProps(state) {
    if (state.weatherData.week.meta == null)
        return {credit: '', show: false, url: ''};
    return {
        credit: state.weatherData.week.meta.credit.text,
        show: state.footer.show,
        url: state.weatherData.week.meta.credit.url
    };
}

export const FooterContainer = connect(mapStateToProps)(Footer);