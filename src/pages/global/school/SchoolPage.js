/**
 * SchoolPage.js
 */

import React, {Component} from 'react';
import {Alert, ScrollView, Text, View} from "react-native";
import { Card, ListItem } from 'react-native-elements'

// Axios dependencies
import axios from "axios";
import apiConfig from '../../../configs/apiConfig';

// Configs dependencies
import mainStyle from '../../../configs/mainStyle';
import images from '../../../configs/images';

// Component dependencies
import LoadingView from "../loader/LoadingView";
import HeaderTitle from "../../components/HeaderTitle";

export default class SchoolPage extends Component {
    static navigationOptions = {
        title: 'Your class',
    };

    state = {
        isLoading: true,
        schoolData: []
    };

    _getSpecificSchoolData(teacherID, schoolID) {
        let {navigation} = this.props;
        let userToken = navigation.getParam('userToken', '');

        // + '/classes/' + schoolID
        let urlParams = '/classes/' + schoolID;
        axios(apiConfig.urlApi + urlParams, {headers: {'X-AUTH-TOKEN': userToken}})
            .then(res => {
                let data = res.data.data;
                this.setState({
                    isLoading: false,
                    schoolData: data,
                })
            })
            .catch(error => {
                let code = error.data.code;
                let message = error.data.message;

                Alert.alert('Information', message, { cancelable: false });
            });
    }

    _onChildrenNavigate(childrenID) {
        let {navigation} = this.props;
        let userToken = navigation.getParam('userToken', '');
        navigation.navigate('ChildrenPage', {idChildren: childrenID, source: 'parent', userToken: userToken});
    }

    componentDidMount() {
        let {navigation} = this.props;
        let schoolID = navigation.getParam('idSchool', '');
        let teacherID = navigation.getParam('idTeacher', '');
        this._getSpecificSchoolData(teacherID, schoolID);
    }

    render() {
        let {isLoading, schoolData} = this.state;

        if(isLoading) {
            return(
                <LoadingView/>
            )
        }

        let schoolLevel = schoolData.school_level.label;
        let schoolYear = ' (' + schoolData.year_start + " - " + schoolData.year_end + ')';

        let childrenSchoolItems = [];
        schoolData.childrens.map((item, index) => {
            let id = item.id;
            let name = item.firstname + " " + item.lastname;

            childrenSchoolItems.push(
                <ListItem
                    key={'school-' + index}
                    title={name}
                    chevron={true}
                    leftAvatar={{ source: { uri: 'https://www.resume.stevenfrancony.fr/dist/img/profile.png' } }}
                    onPress={this._onChildrenNavigate.bind(this, id)}
                />
            )
        });

        return(
            <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
                <HeaderTitle text={schoolLevel + schoolYear}/>
                {childrenSchoolItems}
            </ScrollView>
        );
    }
}
