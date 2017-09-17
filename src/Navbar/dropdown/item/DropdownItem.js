
import React, { Component } from 'react';
import './style.css';


export class DropdownItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: this.props.isActive
        };

        // Set active to true on click. Give background color
    }

    handleClick() {
        this.props.handleClick(this.props.lang);
    }

    render() {
        let active = this.state.isActive ? 'dropdown-item active': 'dropdown-item';
        return (
            <li className={active} onClick={this.handleClick.bind(this)}>
                {this.props.children}
            </li>
        );
    };
}
