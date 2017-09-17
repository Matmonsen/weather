import React, {Component} from 'react';
import './style.css';
import {Translate} from "../i18n";
import {MainSite, SourceCodeAPI, SourceCodeWEBFONT, SourceCodeAPP} from "../config";

class About extends Component {

    componentDidMount() {
        this.props.hideFooter();
    }

    render() {

        return(
            <div className="about">
                <div className="about-page">
                    <h1>{Translate[this.props.language]["about"]}</h1>
                    {Translate[this.props.language]["thisProjectServes1"]} <a href="http://www.yr.no/" target="_blank">Yr.no</a>.
                    {Translate[this.props.language]["thisProjectServes2"]} <a href="https://www.djangoproject.com/" target="_blank">Django (backend) </a>
                    {Translate[this.props.language]["thisProjectServes3"]} <a href="https://facebook.github.io/react/" target="_blank">React (frontend)</a>.

                    <p>
                        {Translate[this.props.language]["checkOutMainPage1"]} <a href={MainSite} target="_blank">{MainSite.substr(7, MainSite.length)}</a> {Translate[this.props.language]["checkOutMainPage2"]}
                    </p>

                    <p>
                        {Translate[this.props.language]["readMoreCookiePolicy"]}
                    </p>

                    <div className="about-list">
                        <h2>{Translate[this.props.language]["sourceCodeOnGithub"]}</h2>
                            <p><a href={SourceCodeAPI} target="_blank">Api (Django)</a></p>
                            <p><a href={SourceCodeAPP} target="_blank">App (React)</a></p>
                            <p><a href={SourceCodeWEBFONT} target="_blank">{Translate[this.props.language]["webFontUsed"]}</a></p>
                    </div>
                </div>
            </div>
        );
    }
}



export default About;
