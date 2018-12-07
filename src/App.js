/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';

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
import {createRootNavigator, MainNavigator} from './navigators/MainNavigator';
import AsyncStorageHelper from "./tools/AsyncStorageHelper";
import LoadingView from "./pages/global/loader/LoadingView";
import {createAppContainer} from "react-navigation";
//import LoginPage from "./pages/global/login/LoginPage";
//import HomePage from "./pages/global/home/HomePage";

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
        isSignIn: false,
        checkedSignIn: false
    };

    async componentDidMount() {
        let userToken = await AsyncStorageHelper.getUserToken();

        if(userToken !== '') {
            store.getState().authState.userToken = userToken;
            this.setState({
                isSignIn: true,
                checkedSignIn: true
            });
        } else {
            this.setState({
                checkedSignIn: true
            });
        }
    }


    render() {
        let { isSignIn, checkedSignIn } = this.state;

        if (!checkedSignIn) {
            return(
                <LoadingView/>
            )
        }

        const Layout = createAppContainer(MainNavigator(isSignIn));
        return (
            <Provider store={store}>
                <Layout/>
            </Provider>
        );
    }
}