import {connect} from 'react-redux';
import About from "./Component";
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

export const AboutContainer = connect(mapStateToProps, mapDispatchToProps)(About);