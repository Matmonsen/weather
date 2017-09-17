import { compose, createStore, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage';
import reducers  from './reducers';
import promise from 'redux-promise';
import logger from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import {routerMiddleware } from 'react-router-redux'

const history = createHistory();


let enhancer = compose(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(promise),
    persistState(),
);

if (process.env.NODE_ENV === 'development') {
    enhancer = compose(
        applyMiddleware(logger),
        enhancer
    );
}


let store = createStore(
    reducers,
    enhancer
);


export default store;