import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import allReducers from './js/reducers';
import App from './js/components/App';
import logger from 'redux-logger'

const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise,logger)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
