import {connect} from 'react-redux';
import Cookies from "./Component";
import {setFooterVisibliity} from "../redux/actions";
import {FooterFilter} from "../redux/actionTypes";

function mapStateToProps(state) {
    return {
        language: state.language.current
    }
}

function mapDispatchToProps(dispatch) {
    return {
        hideFooter: () => dispatch(setFooterVisibliity(FooterFilter.HIDE_CREDIT)),
    }
}

export const CookiesContainer = connect(mapStateToProps, mapDispatchToProps)(Cookies);
