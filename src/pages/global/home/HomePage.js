/**
 * HomePage.js
 */

import React, {Component} from 'react';
import { ScrollView, Text } from 'react-native';

// Redux Components
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Reducers Components
import * as AuthStateActions from './../../../redux/reducers/AuthReducer';

// Configs dependencies
import mainStyle from '../../../configs/mainStyle';

class HomePage extends Component {

    render() {
        return(
            <ScrollView style={{padding: 20}}>
                <Text
                    style={{fontSize: 27}}>
                    Welcome
                </Text>
            </ScrollView>
        )
    }
}

// Redux Connect
export default connect(
    state => ({
        authState: state.authState
    }),
    dispatch => ({
        authStateActions: bindActionCreators(AuthStateActions, dispatch)
    })
)(HomePage);