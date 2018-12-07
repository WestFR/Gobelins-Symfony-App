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
import HeaderTitle from "../../components/HeaderTitle";

export default class ChildrenPage extends Component {
    static navigationOptions = {
        title: 'Children(s)',
    };

    state = {
        isLoading: true,
        childrenData: []
    };

    _getSpecifiChildrenData(childrenID) {
        let {navigation} = this.props;
        let userToken = navigation.getParam('userToken', '');

        let urlParams = '/childrens/' + childrenID;
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

    componentDidMount() {
        let {navigation} = this.props;
        let childrenID = navigation.getParam('idChildren', '');
        this._getSpecifiChildrenData(childrenID);
    }

    render() {
        let {navigation} = this.props;
        let {isLoading, childrenData} = this.state;

        let sourceType = navigation.getParam('source', '');

        if(isLoading) {
            return(
                <LoadingView/>
            )
        }

        let schoolLevel = false;
        if (sourceType === 'teacher') {
            let schoolLevel = 'School level : ' + childrenData.school_level.label;
        }

        let name = 'Name : ' + childrenData.firstname + " " + childrenData.lastname;
        let borned_at = 'Date of birth : ' + childrenData.borned_at;

        let schoolClass = childrenData.school_class;

        let schoolYear = 'School year : ' + schoolClass.year_start + " - " + schoolClass.year_end;

        let teacher = childrenData.school_class.teacher;
        let schoolTeacher = 'Teacher : ' + teacher.firstname + ' ' + teacher.lastname;

        let childrenActions = [];
        return(
            <ScrollView contentContainerStyle={{justifyContent: 'center'}}>

                <HeaderTitle text={'General informations'}/>
                <ListItem key={'name'} title={name} hideChevron={true}/>
                <ListItem key={'birth'} title={borned_at} hideChevron={true}/>

                <HeaderTitle text={schoolYear}/>
                {schoolLevel  &&  <ListItem key={'schoolLevel'} title={schoolLevel} hideChevron={true}/>}
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
