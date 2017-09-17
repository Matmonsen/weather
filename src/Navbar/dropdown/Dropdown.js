
import React, { Component } from 'react';
import './style.css';

export class Dropdown extends Component {

    render() {
        if (this.props.show)
            return (
                <div className="dropdown">
                    {this.props.children}
                </div>
            );
        else
            return null;
    };
}
