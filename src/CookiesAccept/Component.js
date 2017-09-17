import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import './style.css';
import {Routes} from "../routing";
import {setCookie, getCookie} from "../services/cookies";
import {Cookies} from "../config";
import {Translate} from "../i18n";

class CookiesAccept extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: getCookie(Cookies.ACCEPT)
        }
    }

    /**
     * Closes the cookie accept speech and stores the acceptance
     */
    handleCloseClick() {
        setCookie(Cookies.ACCEPT, true);
        this.setState({show: false})
    }

    handleInfoClick() {
        this.props.router.push(Routes.cookies.push);
    }

    render() {
        if (!this.state.show)
            return null;

        return(
            <div className="cookies-accept">
                <div className="cookies-accept-content">
                    <div className="cookies-accept-text">
                        {Translate[this.props.language]['acceptCookies']}
                    </div>

                    <div className="cookies-accept-buttons">
                        <IconButton  className="cookies-accept-close-button" onClick={this.handleCloseClick.bind(this)} >
                            <NavigationClose />
                        </IconButton>
                        <IconButton className="cookies-accept-info-button" onClick={this.handleInfoClick.bind(this)} >
                            <ActionInfo />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default CookiesAccept;
