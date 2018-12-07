/**
 * LoadingView.js
 */

import React, {Component} from 'react';
import { ActivityIndicator, View} from 'react-native';

// Configs dependencies
import mainStyle from '../../../configs/mainStyle';

export default class LoadingView extends Component {

    render() {
        return(
            <View style={mainStyle.centerContainer}>
                <ActivityIndicator/>
            </View>
        )
    }
}
