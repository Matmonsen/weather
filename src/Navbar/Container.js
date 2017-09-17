import {connect} from 'react-redux';
import Navbar from "./Component";
import {switchLanguage, setFooterVisibliity} from "../redux/actions";
import {loadDataInBackground} from "../utils/utils";
import {FooterFilter} from "../redux/actionTypes";

const mapStateToProps = (state, ownProps) => {
    return {
        language: state.language.current,
        week: state.week,
        hour: state.hour,
        searchQuery: state.search.query
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        switchLanguage: (language, location) => {
            dispatch(switchLanguage(language));
            dispatch(setFooterVisibliity(FooterFilter.HIDE_CREDIT));
            loadDataInBackground(language, location, ownProps.history, dispatch);
        }
    }
};

export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);
