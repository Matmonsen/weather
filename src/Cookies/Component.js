import React, {Component} from 'react';
import './style.css';
import {Translate} from "../i18n";

class Cookies extends Component {
    componentDidMount() {
        this.props.hideFooter();
    }

    render() {

        return(
            <div className="cookies">
                <h1>{Translate[this.props.language]["cookies"]}</h1>
                {Translate[this.props.language]["whyUseCookies"]}
                <div className="about-content">
                    <h2>{Translate[this.props.language]["whatAreCookies"]}</h2>
                    {Translate[this.props.language]["whatAreCookiesText"]}
                </div>
                <div className="about-content">
                    <h2>{Translate[this.props.language]["howWeUseCookie"]}</h2>
                    <div>
                        <p>{Translate[this.props.language]["cookieGA"]}</p>
                        <p>{Translate[this.props.language]["cookieAccept"]}</p>
                    </div>
                </div>
                <div className="about-content">
                    <h2>{Translate[this.props.language]["howToControlCookies"]}</h2>
                    {Translate[this.props.language]["howToControlCookiesText"]}
                </div>
            </div>
        );
    }
}

export default Cookies;