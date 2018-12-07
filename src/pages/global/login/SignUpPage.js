/**
 * LoginPage.js
 */

import axios from 'axios';

import React, {Component} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Alert, View, Text, TextInput, Button, Image, TouchableHighlight} from 'react-native';

// Redux Components
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Reducers Components
import * as AuthStateActions from './../../../redux/reducers/AuthReducer';

// Configs dependencies
import apiConfig from '../../../configs/mainStyle';
import mainStyle from '../../../configs/mainStyle';


class SignUpPage extends Component {
    state = {
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
        mail: '',
        phone: '',
        borned_at: '',
        type: ''
    };

    render() {
        return(
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContainer}
                >

                    <View style={styles.scrollViewContent}>

                        <Button
                            onPress={() => this.props.navigation.goBack()}
                            title={"Back"}
                        />

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Firstname"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(email) => this.setState({email})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Lastname"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(email) => this.setState({email})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Email"
                                       keyboardType="email-address"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(email) => this.setState({email})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Password"
                                       secureTextEntry={true}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(password) => this.setState({password})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Confirm password"
                                       secureTextEntry={true}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(password) => this.setState({password})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Phone"
                                       keyboardType="phone-pad"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(email) => this.setState({email})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Bornet at"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(email) => this.setState({email})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Type"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(email) => this.setState({email})}/>
                        </View>

                        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                            <Text style={styles.loginText}>Create account</Text>
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
)(SignUpPage);


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
        width:30,
        height:30,
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