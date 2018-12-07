/**
 * ParentProfile.js
 */

import React, {Component} from 'react';
import { Card, ListItem } from 'react-native-elements'

// Configs dependencies
import mainStyle from '../../../../configs/mainStyle';
import images from '../../../../configs/images';

export default class ParentProfile extends Component {
    props: {
        navigation: null,
        childrens: [],
        userToken: ''
    };

    _onChildrenNavigate(childrenID) {
        let {userToken, navigation} = this.props;
        navigation.navigate('ChildrenPage', {idChildren: childrenID, source: 'parent', userToken: userToken});
    }

    render() {
        let {idParent, childrens} = this.props;

        let childrenItems = [];
        childrens.map((item, index) => {
            let idChildren = item.id;
            let name = item.firstname + " " + item.lastname;

            childrenItems.push(
                <ListItem
                    key={'school-' + index}
                    title={name}
                    leftAvatar={{ rounded: true, source:images.emptyAvatar}}
                    onPress={this._onChildrenNavigate.bind(this, idChildren)}
                />
            )
        });

        return(
            <Card title="My Childrens">
                {childrenItems}
            </Card>
        )
    }
}
