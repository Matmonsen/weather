import {Routes} from './routes';
import AboutContainer from "../About";
import WeekContainer from "../Week";
import NowContainer from "../Now";
import HourContainer from "../Hour";
import SettingsContainer from "../Settings";
import SearchContainer from "../Search";
import CookiesContainer from "../Cookies";
import AppContainer from "../App";
import React from 'react';
import {Route, Redirect,Switch } from 'react-router-dom'

import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'


console.log("AppContainer", AppContainer)

export const Routers =  (
    <ConnectedRouter history={createHistory()}>
            <AppContainer>
                    <Switch>
                        <Route path={Routes.search.url} component={SearchContainer}/>
                        <Route path={Routes.settings.url} component={SettingsContainer}/>
                        <Route path={Routes.now.url} component={NowContainer}/>
                        <Route path={Routes.hour.url} component={HourContainer}/>
                        <Route path={Routes.week.url} component={WeekContainer} />
                        <Route path={Routes.about.url} component={AboutContainer}/>
                        <Route path={Routes.cookies.url} component={CookiesContainer}/>
                        <Redirect exact from={Routes.home.url} to={Routes.search.url}/>
                    </Switch>
            </AppContainer>

    </ConnectedRouter>
);