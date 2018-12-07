/**
 * MainNavigator.js
 */

import React from "react";

import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";

// Main Pages of application
import LoginPage from '../pages/global/login/LoginPage';
import SignUpPage from '../pages/global/login/SignUpPage';
import HomePage from '../pages/global/home/HomePage';

// SubMain Pages of applications
import ChildrenPage from "../pages/global/children/ChildrenPage";
import SchoolPage from "../pages/global/school/SchoolPage";


const SignedOut = createStackNavigator(
    {
        LoginPage: {screen: LoginPage, navigationOptions: { header: null }},
        SignUpPage: {screen: SignUpPage, navigationOptions: { header: null }},
    }
);

const SignedIn = createStackNavigator(
    {
        HomePage: {screen: HomePage},
        ChildrenPage: {screen: ChildrenPage},
        SchoolPage: {screen: SchoolPage},
    }
);

export const MainNavigator = (signedIn = false) => {
    return createSwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};

//export default createAppContainer(MainNavigator);