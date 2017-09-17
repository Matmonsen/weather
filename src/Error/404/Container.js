import {connect} from 'react-redux';
import Error404 from "./Component";

function mapStateToProps(state) {

    return {
        language: state.language.current,
    };
}

export const Error404Container = connect(mapStateToProps)(Error404);
