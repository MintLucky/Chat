import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DevTools from './common/containers/DevTools';
// import { Router } from 'react-router';
import { Router } from 'react-router';
import './common/css/index.css';
import App from './common/containers/App';
import configureStore from './common/store/configureStore';
import routes from './common/routes';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Router children={routes} />
    </Provider>,
    document.getElementById('root')
);