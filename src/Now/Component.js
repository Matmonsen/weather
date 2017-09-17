import React, {Component} from 'react';
import SingleReport from '../Singlereport/Component';
import {Translate} from "../i18n";
import Loading from '../Loading';
import {forecastIsInvalid} from "../utils/utils";

class Now extends Component {
    componentDidMount() {
        if (forecastIsInvalid(this.props.forecast, this.props.lastModified))
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
            return (<div className="now">
                <SingleReport forecast={this.props.forecast} language={this.props.language} location={this.props.location} title={Translate[this.props.language]["now"]}/>
            </div>)
        }
    }
}

export default Now;