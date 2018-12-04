/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { SafeAreaView } from 'react-native';

// Redux components
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers dependencies
import reducers from './redux/reducers';

// Configs dependencies
//import mainStyle from "./configs/mainStyle";
//import images from "./configs/images";

// Pages dependencies
import LoginPage from "./pages/global/login/LoginPage";
import HomePage from "./pages/global/home/HomePage";

// Middleware, Reducers & Stores variables
const middleware = [
    thunk
];

const rootReducer = combineReducers({
    ...reducers
});

const composedEnhancers = compose(
    applyMiddleware(...middleware)
);

const store = createStore(
    rootReducer,
    composedEnhancers
);



export default class App extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoggedIn: false
    };

    render() {
        let {isLoggedIn} = this.state;

        let pageContent = null;
        if (isLoggedIn) {
            pageContent = (
                <HomePage/>
            )
        } else {
            pageContent = (
                <LoginPage/>
            )
        }

        return (
            <Provider store={store}>
                <SafeAreaView>
                    {pageContent}
                </SafeAreaView>
            </Provider>
        );
    }
}