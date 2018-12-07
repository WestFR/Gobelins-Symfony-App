/**
 * SchoolPage.js
 */

import React, {Component} from 'react';
import {Alert, ScrollView, View, Text} from "react-native";
import { Card, ListItem } from 'react-native-elements'

// Axios dependencies
import axios from "axios";
import apiConfig from '../../../configs/apiConfig';

// Configs dependencies
import mainStyle from '../../../configs/mainStyle';
import images from '../../../configs/images';

// Component dependencies
import LoadingView from "../loader/LoadingView";

export default class ChildrenPage extends Component {
    state = {
        isLoading: true,
        childrenData: []
    };

    _getSpecifiChildrenData(parentID, childrenID) {
        let {navigation} = this.props;
        let userToken = navigation.getParam('userToken', '');

        let urlParams = '/parents/' + parentID + '/childrens/' + childrenID;
        axios(apiConfig.urlApi + urlParams, {headers: {'X-AUTH-TOKEN': userToken}})
            .then(res => {
                console.log(res);
                let data = res.data.data;
                this.setState({
                    isLoading: false,
                    childrenData: data,
                })
            })
            .catch(error => {
                console.log(error);
                let code = error.data.code;
                let message = error.data.message;

                Alert.alert('Information', message, { cancelable: false });
            });
    }

    _renderHeader(titleToShow) {
        return (
            <View style={mainStyle.headerContainer}>
                <Text style={mainStyle.headerText}>
                    {titleToShow}
                </Text>
            </View>
        )
    }


    componentDidMount() {
        let {navigation} = this.props;
        let parentID = navigation.getParam('idParent', '');
        let childrenID = navigation.getParam('idChildren', '');
        this._getSpecifiChildrenData(parentID, childrenID);
    }

    render() {
        let {isLoading, childrenData} = this.state;

        if(isLoading) {
            return(
                <LoadingView/>
            )
        }

        console.log(childrenData);

        let name = 'Name : ' + childrenData.firstname + " " + childrenData.lastname;
        let borned_at = 'Date of birth : ' + childrenData.borned_at;

        let schoolClass = childrenData.school_class;
        let schoolLevel = 'School level : ' + schoolClass.school_level.label;
        let schoolYear = 'School year : ' + schoolClass.year_start + " - " + schoolClass.year_end;

        let teacher = childrenData.school_class.teacher;
        let schoolTeacher = 'Teacher : ' + teacher.firstname + ' ' + teacher.lastname;

        let childrenActions = [];
        return(
            <ScrollView contentContainerStyle={{justifyContent: 'center'}}>

                {this._renderHeader('General informations')}
                <ListItem key={'name'} title={name} hideChevron={true}/>
                <ListItem key={'birth'} title={borned_at} hideChevron={true}/>

                {this._renderHeader(schoolYear)}
                <ListItem key={'schoolLevel'} title={schoolLevel} hideChevron={true}/>
                <ListItem key={'teacher'} title={schoolTeacher} hideChevron={true}/>
                <ListItem key={'score'} title={'Score : ' + childrenData.score} hideChevron={true}/>
                <ListItem key={'childrenLevel'} title={'Level : ' + childrenData.level} hideChevron={true}/>

                {/*<Card title="Actions">
                    {childrenActions}
                </Card>*/}

            </ScrollView>
        );
    }
}
