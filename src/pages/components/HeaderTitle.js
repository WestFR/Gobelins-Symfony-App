/**
 * UserProfile.js
 */

import React, {Component} from 'react';
import {View, Text} from "react-native";

// Configs dependencies
import mainStyle from '../../configs/mainStyle';


export default class HeaderTitle extends Component {
    props: {
        text: 'placeholder'
    };


    render() {
        let {text} = this.props;

        return (
            <View style={mainStyle.headerContainer}>
                <Text style={mainStyle.headerText}>
                    {text}
                </Text>
            </View>
        )
    }
}
