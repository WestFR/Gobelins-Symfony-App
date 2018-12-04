/**
 * LoginPage.js
 */

import axios from 'axios';

import React, {Component} from 'react';
import { ScrollView, Alert, View, Text, TextInput, Button } from 'react-native';

// Redux Components
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Reducers Components
import * as AuthStateActions from './../../../redux/reducers/AuthReducer';

// Configs dependencies
import mainStyle from '../../../configs/mainStyle';


class LoginPage extends Component {

    state = {
        mail: '',
        password: '',
        isAuthenticated: false,
        userToken: ''
    };

    _onLoginPress() {
        let {mail, password} = this.state;

        if (mail === '' || password === '') {
            Alert.alert('Erreur', 'Le formulaire est vide.', { cancelable: false });
            return;
        }

        axios.post(`http://127.0.0.1:8000/api/auth/login`, { mail, password })
            .then(res => {
                let code = res.data.code;
                let message = res.data.message;
                let token = res.data.token;

                if (code === 200) {
                    this.setState({
                        isAuthenticated: true,
                        userToken: token,
                    }, () => {
                        Alert.alert('Information', message, { cancelable: false });
                    })
                }
            })
            .catch(error => {
                let code = error.response.data.code;
                let message = error.response.data.message;
                Alert.alert('Information', message, { cancelable: false });
            });

        //this.props.authStateActions.postLogin(mail, password);
    }

    _onConfirmLogout() {
        Alert.alert(
            'Information',
            'Êtes vous sûr de vouloir vous déconnecter', [
                {text: 'Yes', onPress: () => this._onLogout()},
                {text: 'No', style: 'cancel'},
            ],
            { cancelable: false }
        );
    }

    _onLogout() {
        axios('http://127.0.0.1:8000/api/auth/logout', {headers: {'X-AUTH-TOKEN': this.state.userToken}})
            .then(res => {
                let code = res.data.code;
                let message = res.data.message;

                if (code === 200) {
                    this.setState({
                        isAuthenticated: false,
                        userToken: '',
                    }, () => {
                        Alert.alert('Information', message, {cancelable: false});
                    })
                }
            })
            .catch(error => {
                let code = error.data.code;
                let message = error.data.message;

                Alert.alert('Information', message, { cancelable: false });
            });
    }

    render() {
        let {isAuthenticated} = this.state;

        if(isAuthenticated) {
            return (
                <ScrollView style={{padding: 20}}>
                    <View><Text>You are connected</Text></View>

                    <Button
                        onPress={this._onConfirmLogout.bind(this)}
                        title={"Déconnexion"}
                    />

                </ScrollView>
            );
        } else {

            return (
                <ScrollView style={{padding: 20}}>


                    <View style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Text
                            style={{fontSize: 27}}>
                            Login
                        </Text>

                        <TextInput
                            style={{
                                width: '70%',
                                borderRadius: 20,
                                textAlign: 'center',
                                backgroundColor: 'grey',
                                height: 44,
                                marginTop: 40
                            }}
                            placeholder='Mail'
                            onChangeText={(mail) => this.setState({mail})}
                        />

                        <TextInput
                            style={{
                                width: '70%',
                                borderRadius: 20,
                                textAlign: 'center',
                                backgroundColor: 'grey',
                                height: 44,
                                marginTop: 20,
                                marginBottom: 40
                            }}
                            placeholder='Password'
                            onChangeText={(password) => this.setState({password})}
                        />

                        <Button
                            onPress={this._onLoginPress.bind(this)}
                            title="Connexion"
                        />

                        <Text>Mot de passe oublié ?</Text>
                        <Text>Pas de compte ? Créez le votre</Text>

                    </View>

                </ScrollView>
            )
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
)(LoginPage);