import React, { Component } from 'react';
import {Translate} from '../../i18n';
class Error404 extends Component {

    render() {
        return (
            <h3 style={{textAlign: 'center'}}>
                {Translate[this.props.language]["error404"]}
            </h3>
        );
    }
}

export default Error404;