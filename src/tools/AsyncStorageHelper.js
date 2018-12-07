/**
 * tools/AsyncStorageHelper.js
 */

import {AsyncStorage} from "react-native";

export default class AsyncStorageHelper {

    /*
     * User Get / Set
     */
    static async getUserToken() {
        try {
            const value = await AsyncStorage.getItem('USER_TOKEN');
            if (value !== null && value !== undefined) {
                return value;
            } else {
                await this.setUserToken('');
                return '';
            }
        } catch (error) {
        }
    }

    static async setUserToken(userToken) {
        try {
            const value = await AsyncStorage.setItem('USER_TOKEN', userToken);
            if (value !== null && value !== undefined) {
                return value;
            }
        } catch (error) {
        }
    }
}
/*
export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("USER_KEY")
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};*/