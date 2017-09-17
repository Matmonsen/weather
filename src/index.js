import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import store  from './redux/configStore';
import { Provider } from 'react-redux';
import Theme from "./config";
import * as ReactGA from "react-ga";
import {GoogleAnalyticsKey} from "./config/index";
import {logPageView} from "./utils/googleAnalytics";

import {Routes} from './routing';
import AboutContainer from "./About";
import WeekContainer from "./Week";
import NowContainer from "./Now";
import HourContainer from "./Hour";
import SettingsContainer from "./Settings";
import SearchContainer from "./Search";
import CookiesContainer from "./Cookies";
import AppContainer from "./App";
import {Route, Redirect,Switch } from 'react-router-dom'

import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import registerServiceWorker from './registerServiceWorker';


ReactGA.initialize(GoogleAnalyticsKey);


ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
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
            </MuiThemeProvider>
        </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

