/**
 * TeacherProfile.js
 */

import React, {Component} from 'react';
import { Card, ListItem } from 'react-native-elements'

// Configs dependencies
import mainStyle from '../../../../configs/mainStyle';
import images from '../../../../configs/images';
import HeaderTitle from "../../../components/HeaderTitle";
import {View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class TeacherProfile extends Component {
    props: {
        navigation: null,
        idTeacher: '',
        schools: [],
        userToken: ''
    };

    _onSchoolNavigate(teacherID, schoolID) {
        let {userToken, navigation} = this.props;
        navigation.navigate('SchoolPage', {idSchool: schoolID, idTeacher: teacherID, userToken: userToken});
    }

    render() {
        let {idTeacher, schools} = this.props;

        let schoolItems = [];
        schools.map((item, index) => {
            let id = item.id;
            let name = item.school_level.label;
            let year = item.year_start + " - " + item.year_end;

            schoolItems.push(
                <ListItem
                    key={'school-' + index}
                    title={name + " (" + year + ")"}
                    chevron={true}
                    leftIcon={<Icon style={mainStyle.inputIcon} name={'school'}/>}
                    onPress={this._onSchoolNavigate.bind(this, idTeacher, id)}
                    hide={true}
                />
            )
        });

        return(
            <View>
                <HeaderTitle text={'My classes'}/>
                {schoolItems}
            </View>
        )
    }
}


