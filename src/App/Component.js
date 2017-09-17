import React, { Component } from 'react';
import {NavbarContainer} from '../Navbar/Container';
import Footer from '../Footer';
import CookiesAccept from '../CookiesAccept/Component';
import {CheckForCacheReload} from '../config';
import './style.css';
import moment from "moment";

class App extends Component {

    /**
     * Tries to reload the cache with weather data
     */
    tryReloadCache = () => {
        let rate = Number(this.props.refreshRate);
        let difference_in_minutes = moment().diff(moment(this.props.lastModified), "minutes");

        if (this.props.lastModified === null ||  difference_in_minutes >=rate )
            this.props.reLoad(this.props.language, this.props.searchQuery);
    };

    componentDidMount() {
        this.props.init(this.props.language, this.props.searchQuery);

        setInterval(() => {
            this.tryReloadCache();
        }, CheckForCacheReload);
    }

    render() {
        return (
                <div>
                    <NavbarContainer />
                    <main>
                        {this.props.children}
                    </main>
                    <Footer />
                    <CookiesAccept router={this.props.router} language={this.props.language}/>
                </div>
        );
    }
}

export default App;