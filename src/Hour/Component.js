import React, { Component } from 'react';
import TableReport from '../Tablereport';
import Loading from "../Loading";
import './style.css';
import moment from "moment";

class Hour extends Component {
    componentDidMount() {
        if (typeof this.props.forecasts === "undefined"
            || this.props.forecasts.length === 0
            || typeof this.props.lastModified === "undefined"
            || this.props.lastModified === null
            || !moment().isSame(this.props.lastModified, 'day'))
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
            return (<div className="hour">
                <TableReport language={this.props.language} location={this.props.location} forecasts={this.props.forecasts} />
            </div>)
        }

    }
}

export default Hour;