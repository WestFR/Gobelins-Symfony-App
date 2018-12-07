/**
 * mainStyle.js
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

// Configs dependencies
import fonts from './fonts';
import colors from './colors';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#3F51B5'
    },
    inputIcon:{
        fontSize: 22,
        marginLeft:10,
        marginRight:10,
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
});