import React, { Component } from 'react';
import './style.css';

class Footer extends Component {
    render() {
        if (this.props.show)
            return (
                <footer>
                    <a href={this.props.url} target="_blank">{this.props.credit}</a>
                </footer>
            );

        return null;
    }
}
export default Footer;