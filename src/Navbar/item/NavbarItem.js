import React, { Component } from 'react';

import { NavLink } from 'react-router-dom'
import './style.css';

export class NavbarItem extends Component {

    click() {
        // Only if this.props.handleClick IS a function
        (this.props.handleClick || Function)();
    }

    render() {

        const { router } = this.context;

        const isActive = this.props.to === router.history.location.pathname;

        if (typeof this.props.usesLink !== 'undefined') {

            return (
                <div className={isActive ? "navbar-item navbar-item-highlight" : "navbar-item"} onClick={this.click.bind(this)}>
                    <NavLink activeClassName="active" to={this.props.to}>
                        {this.props.children}
                        <span className="navbar-item-text">
                            {this.props.text}
                            </span>
                    </NavLink>
                </div>
            )
        }else
            return (
                <div className="navbar-item" onClick={this.click.bind(this)}>
                    <span>{this.props.children}<span className="navbar-item-text">{this.props.text}</span></span>
                </div>
            )
    };
}

NavbarItem.contextTypes = {
    router: React.PropTypes.object
};


