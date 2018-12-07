/**
 * UserProfile.js
 */

import React, {Component} from 'react';
import { Card, ListItem } from 'react-native-elements'

// Configs dependencies
import mainStyle from '../../../../configs/mainStyle';

export default class UserProfile extends Component {
    props: {
        profil: []
    };


    render() {
        let {profil} = this.props;

        return(
            <Card title="MY PROFILE">
                <ListItem key={'name'} title={profil.firstname + " " + profil.lastname} hideChevron={true}/>
                <ListItem key={'mail'} title={profil.mail} hideChevron={true}/>
                <ListItem key={'phone'} title={profil.phone} hideChevron={true}/>
                <ListItem key={'borned_at'} title={profil.borned_at} hideChevron={true}/>
            </Card>
        )
    }
}
