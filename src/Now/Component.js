import React, {Component} from 'react';
import {setFooterVisibliity} from '../redux/actions';
import {FooterFilter} from '../redux/actionTypes';
import SingleReport from '../Singlereport/Component';
import {Translate} from "../i18n";
import Loading from '../Loading';
import moment from "moment";

class Now extends Component {
    componentDidMount() {
        if (typeof this.props.forecast === "undefined"
            || this.props.forecast === null
            || typeof this.props.lastModified === "undefined"
            || this.props.lastModified === null
            || !moment().isSame(this.props.lastModified, 'day'))
            this.props.redirectToSearch();

        this.props.showFooter();
    }

    componentWillUnmount() {
        this.props.hideFooter(setFooterVisibliity(FooterFilter.HIDE_CREDIT));
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