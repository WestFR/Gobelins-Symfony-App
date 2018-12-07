/**
 * LoginPage.js
 */

import axios from 'axios';

import React, {Component} from 'react';
import { StyleSheet, Image, TouchableHighlight, SafeAreaView, ScrollView, Alert, View, Text, TextInput, Button } from 'react-native';

// Redux Components
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Reducers Components
import * as AuthStateActions from './../../../redux/reducers/AuthReducer';

// Icons Components
import Icon from 'react-native-vector-icons/FontAwesome5';

// Configs dependencies
import mainStyle from '../../../configs/mainStyle';
import AsyncStorageHelper from "../../../tools/AsyncStorageHelper";
import LoadingView from "../loader/LoadingView";


class LoginPage extends Component {

    state = {
        mail: '',
        password: '',
        isLoading: false,
    };

    _onLoginLoad() {
        this.setState({
            isLoading: true
        }, () => {
            this._onLoginPress();
        });
    }

    _onLoginPress() {
        let {mail, password} = this.state;

        if (mail === '' || password === '') {
            Alert.alert('Erreur', 'Le formulaire est vide.', { cancelable: false });
            return;
        }

        axios.post(`http://127.0.0.1:8000/api/auth/login`, { mail, password })
            .then(res => {
                let code = res.data.code;
                let token = res.data.token;

                if (code === 200) {
                    AsyncStorageHelper.setUserToken(token);
                    this.props.navigation.navigate('SignedIn');
                    //Alert.alert('Information', message, { cancelable: false });
                }
            })
            .catch(error => {
                let code = error.response.data.code;
                let message = error.response.data.message;
                Alert.alert('Information', message, { cancelable: false });
            });

        //this.props.authStateActions.postLogin(mail, password);
    }

    _handleMail(text) {
        let lowercasedText = text.toLowerCase();

        this.setState({
            mail: lowercasedText
        });
    }

    _handlePassword(text) {
        let lowercasedText = text.toLowerCase();

        this.setState({
            password: lowercasedText
        });
    }

    // MARK : App LifeCycle
    componentDidMount() {
        this.props.authStateActions.getAsyncData();
        console.log(this.props.authState);
    }

    render() {
        let {authState} = this.props;
        let {isLoading} = this.state;

        if (isLoading) {
            return(
                <LoadingView/>
            )
        }

            return (
                <View style={styles.container}>
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContainer}
                    >
                        <View style={styles.scrollViewContent}>
                            <View style={styles.inputContainer}>
                                <Icon style={styles.inputIcon} name={'envelope'}/>
                                <TextInput style={styles.inputs}
                                           placeholder="Email"
                                           keyboardType="email-address"
                                           underlineColorAndroid='transparent'
                                           autoCapitalize='none'
                                           onChangeText={(email) => this._handleMail(email)}/>
                            </View>

                            <View style={styles.inputContainer}>
                                <Icon style={styles.inputIcon} name={'key'}/>
                                <TextInput style={styles.inputs}
                                           placeholder="Password"
                                           secureTextEntry={true}
                                           underlineColorAndroid='transparent'
                                           autoCapitalize='none'
                                           onChangeText={(password) => this._handlePassword(password)}/>
                            </View>

                            <TouchableHighlight
                                style={[styles.buttonContainer, styles.loginButton]}
                                onPress={this._onLoginLoad.bind(this)}
                            >
                                <Text style={styles.loginText}>Login</Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={styles.buttonContainer}
                                                onPress={() => this.onClickListener('restore_password')}>
                                <Text>Forgot your password ?</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.buttonContainer}
                                onPress={() => {
                                    this.props.navigation.push('SignUpPage')
                                }}>
                                <Text>No account ? Create your own</Text>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                </View>
            );
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
)(LoginPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DCDCDC',
    },
    scrollViewContainer: {
        flexGrow : 1,
        justifyContent : 'center',
    },
    scrollViewContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
        fontSize: 30,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});