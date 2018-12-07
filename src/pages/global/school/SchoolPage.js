/**
 * SchoolPage.js
 */

import React, {Component} from 'react';
import {Alert, ScrollView} from "react-native";
import { Card, ListItem } from 'react-native-elements'

// Axios dependencies
import axios from "axios";
import apiConfig from '../../../configs/apiConfig';

// Configs dependencies
import mainStyle from '../../../configs/mainStyle';
import images from '../../../configs/images';

// Component dependencies
import LoadingView from "../loader/LoadingView";

export default class SchoolPage extends Component {

    state = {
        isLoading: true,
        schoolData: []
    };

    _getSpecificSchoolData(teacherID, schoolID) {
        let {navigation} = this.props;
        let userToken = navigation.getParam('userToken', '')
        console.log(userToken);

        // + '/classes/' + schoolID
        let urlParams = '/classes/' + schoolID;
        console.log(apiConfig.urlApi + urlParams);
        axios(apiConfig.urlApi + urlParams, {headers: {'X-AUTH-TOKEN': userToken}})
            .then(res => {
                console.log(res);
                let data = res.data.data;
                this.setState({
                    isLoading: false,
                    schoolData: data,
                })
            })
            .catch(error => {
                console.log(error);
                let code = error.data.code;
                let message = error.data.message;

                Alert.alert('Information', message, { cancelable: false });
            });
    }

    _onChildrenNavigate(childrenId) {
        let {navigation} = this.props;
        let userToken = navigation.getParam('userToken', '');

        //navigation.navigate('ChildrenPage', {idChildren: childrenID, idParent: parentID, userToken: userToken});
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

        let name = schoolData.label;
        let year = schoolData.year_start + " - " + schoolData.year_end;

        let childrenSchoolItems = [];
        schoolData.childrens.map((item, index) => {
            let id = item.id;
            let name = item.firstname + " " + item.lastname;

            childrenSchoolItems.push(
                <ListItem
                    key={'school-' + index}
                    title={name}
                    leftAvatar={{ rounded: true, source:images.emptyAvatar}}
                    onPress={this._onChildrenNavigate.bind(this, id)}
                />
            )
        });

        return(
            <ScrollView contentContainerStyle={{justifyContent: 'center'}}>

                <ListItem key={'name'} title={name} hideChevron={true}/>
                <ListItem key={'year'} title={year} hideChevron={true}/>

                <Card title="Childrens">
                    {childrenSchoolItems}
                </Card>

            </ScrollView>
        );
    }
}
