/**
 * UserProfile.js
 */

import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

import Moment from 'react-moment';

// Icons
import Icon from "react-native-vector-icons/FontAwesome5";

// Configs dependencies
import mainStyle from "../../../../configs/mainStyle";

// Components dependencies
import HeaderTitle from "../../../components/HeaderTitle";

export default class UserProfile extends Component {
    props: {
        profil: []
    };

    render() {
        let {profil} = this.props;
        let dateTimeFormat = 'MMMM Do YYYY, h:mm:ss a';

        return(
            <View>
                <HeaderTitle text={'My profile'}/>

                <ListItem
                    key={'name'}
                    title={profil.firstname + " " + profil.lastname}
                    leftAvatar={{ source: { uri: 'https://www.resume.stevenfrancony.fr/dist/img/profile.png' } }}
                    hideChevron={true}
                />


                <ListItem
                    key={'mail'}
                    title={profil.mail}
                    leftIcon={<Icon style={mainStyle.inputIcon} name={'envelope-open'}/>}
                    hideChevron={true}
                />

                <ListItem
                    key={'phone'}
                    title={profil.phone}
                    leftIcon={<Icon style={mainStyle.inputIcon} name={'phone'}/>}
                    hideChevron={true}
                />

                <ListItem
                    key={'borned_at'}
                    leftIcon={<Icon style={mainStyle.inputIcon} name={'birthday-cake'}/>}
                    title={profil.borned_at}
                    hideChevron={true}
                />
            </View>
        )
    }
}
