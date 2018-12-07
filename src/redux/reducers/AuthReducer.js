/**
 * @providesModule redux/reducers/auth
 */

import Axio from './../../tools/AxioHelper';
import AsyncStorageHelper from "../../tools/AsyncStorageHelper";

const initialState = {
    userToken: "",
    isFetching: false,
    isLoaded: false,
    didErrors: false,
    errors: null,
    data: []
};

// Actions
const prefix = 'Auth';
const RECEIVE_ASYNC_STORAGE = prefix + '/ReceiveAsyncStorage';


const RECEIVE_SEGMENTS = prefix + '/Receive';
const RECEIVE_ERROR = prefix + '/Error';
const RECEIVE_LOAD = prefix + '/Load';


// Actions methods
export  const getAsyncData = () => {
    return async (dispatch) => {
        dispatch({
            type: RECEIVE_ASYNC_STORAGE,
            userToken: await AsyncStorageHelper.getUserToken(),
        });
    };
};

export const postLogin = (mail, password) => {
    return (dispatch) => {
        dispatch({
            type: RECEIVE_LOAD
        });

        Axio(
            '/auth/login',
            {mail},
            function (datas) {
                dispatch({
                    type: RECEIVE_SEGMENTS,
                    datas: datas.entity
                });
            },
            function () {
                dispatch({
                    type: RECEIVE_ERROR
                });
            },
            "post"
        );
    }
};

// Actions Dispatcher
export default function (state = initialState, action = {}) {
    console.log(action);
    switch (action.type) {
        case RECEIVE_ASYNC_STORAGE:
            return {
                ...state,
                userToken: action.userToken
            };




        case RECEIVE_LOAD:
            return {
                ...state,
                isLoaded: false,
                isFetching: true
            };
        case RECEIVE_SEGMENTS:
            return {
                ...state,
                isAuthenticated: true,
                isLoaded: true,
                isFetching: false,
                data: action.datas,
            };
        case RECEIVE_ERROR:
            return {
                ...state,
                isLoaded: true,
                didErrors: true,
                data: action.datas,
                error: 'Erreur'
            };
        default:
            return state;
    }
}
