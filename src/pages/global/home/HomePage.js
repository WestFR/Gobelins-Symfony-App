/**
 * HomePage.js
 */

import React, {Component} from 'react';
import { ActivityIndicator,  Alert, Button, ScrollView, Text, View} from 'react-native';
import { Card, ListItem } from 'react-native-elements'

// Api Components
import apiConfig from './../../../configs/apiConfig';

// Redux Components
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Reducers Components
import * as AuthStateActions from './../../../redux/reducers/AuthReducer';

// Api Dependencies
import axios from "axios";

// Helpers Dependencies
import AsyncStorageHelper from './../../../tools/AsyncStorageHelper';

// Configs dependencies
import mainStyle from '../../../configs/mainStyle';

// Pages dependencies
import ParentProfile from "./profile/ParentProfile";
import TeacherProfile from "./profile/TeacherProfile";
import UserProfile from "./profile/UserProfile";

// Global dependencies
import LoadingView from "../loader/LoadingView";


class HomePage extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;

        return {
            title: 'Home',
            headerLeft: (<View></View>),
            headerRight: (
                <View>
                    <Button
                        onPress={() => HomePage._onConfirmLogout(params)}
                        title={"Sign Out"}
                    />
                </View>
            )
        }
    };

    state = {
        isLoading: true,
        userProfile: {}
    };


    static _onConfirmLogout(params) {
        Alert.alert(
            'Information',
            'Êtes vous sûr de vouloir vous déconnecter', [
                {text: 'Yes', onPress: () => HomePage._onLogout(params)},
                {text: 'No', style: 'cancel'},
            ],
            { cancelable: false }
        );
    }

     static async _onLogout(params) {
        params.navigation.navigate('SignedOut');
    }

    async _getUserProfile() {
        let { authState, navigation } = this.props;

        let userToken = await AsyncStorageHelper.getUserToken();


        axios(apiConfig.urlApi + '/users/me', {headers: {'X-AUTH-TOKEN': userToken}})
            .then(res => {
                let data = res.data.data;
                this.setState({
                    isLoading: false,
                    userProfile: data,
                })
            })
            .catch(error => {
                let code = error.data.code;
                let message = error.data.message;

                Alert.alert('Information', message, { cancelable: false });
            });
    }

    componentDidMount() {
        this.props.navigation.setParams({
            authState: this.props.authState,
            navigation: this.props.navigation
        });
        this._getUserProfile();
    }

    render() {
        let { authState, navigation } = this.props;
        let { userProfile } = this.state;

        if(this.state.isLoading) {
            return(
                <LoadingView/>
            )
        } else {

            return (
                <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
                    <UserProfile profil={userProfile}/>

                    {userProfile.type === "parent" &&
                    <ParentProfile
                        navigation={navigation}
                        childrens={userProfile.childrens}
                        userToken={authState.userToken}
                    />
                    }

                    {userProfile.type === "teacher" &&
                    <TeacherProfile
                        navigation={navigation}
                        idTeacher={userProfile.id}
                        schools={userProfile.school_classes}
                        userToken={authState.userToken}
                    />
                    }
                </ScrollView>
            );
        }
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