/**
 * TeacherProfile.js
 */

import React, {Component} from 'react';
import { Card, ListItem } from 'react-native-elements'

// Configs dependencies
import mainStyle from '../../../../configs/mainStyle';
import images from '../../../../configs/images';

export default class TeacherProfile extends Component {
    props: {
        navigation: null,
        idTeacher: '',
        schools: [],
        userToken: ''
    };

    _onSchoolNavigate(schoolID, teacherID) {
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
                    onPress={this._onSchoolNavigate.bind(this, idTeacher, id)}
                />
            )
        });

        return(
            <Card title="My School Classes">
                {schoolItems}
            </Card>
        )
    }
}


