import React, { Component } from 'react';
import TableReport from '../Tablereport';
import Loading from "../Loading";
import './style.css';
import {forecastIsInvalid} from "../utils/utils";

class Week extends Component {
    componentDidMount() {
        if (forecastIsInvalid(this.props.forecasts, this.props.lastModified))
            this.props.redirectToSearch();

        this.props.showFooter();
    }

    componentWillUnmount() {
        this.props.hideFooter();
    }

    componentWillReceiveProps(next) {
        if (!next.loading)
            this.props.showFooter();
    }

    render() {
        if (this.props.loading) {
            return (<div className="now">
                <Loading message={this.props.loadingMessage} />
            </div>);
        } else {
            return (<div className="week">
                <TableReport language={this.props.language} location={this.props.location} forecasts={this.props.forecasts} />
            </div>)
        }
    }
}

export default Week;