/**
 * tools/AxioHelper.js
 */

import axios from 'axios';

import apiConfig from './../configs/apiConfig';

axios.defaults.headers.get['Content-Type'] = 'application/json';

export default function (url = '', params = {}, valid = function () {}, error = function () {}, mode = 'get') {

    if (mode === 'get') {
        params = {
            params: params
        }
    }

    let urlAjax = apiConfig.urlApi + url;
    let customAjax = false;

    if (url.indexOf('http://') !== -1) {
        urlAjax = url;
        customAjax = true;
    }

    if (__DEV__) {
        console.log(urlAjax, params);
    }

    axios[mode](urlAjax, params)
        .then(function (datas) {
            if (datas.data == null) {
                valid(false);
                return;
            }

            if (customAjax) {
                valid(datas.data);
                return;
            }

            /*if (typeof(datas.data['hydra:totalItems']) === 'undefined') {
                valid({
                    total: 1,
                    entity: datas.data
                });
            } else {
                valid({
                    total: datas.data['hydra:totalItems'],
                    entities: datas.data['hydra:member']
                });
            }*/
        })
        .catch(function (errors) {
            console.log('error', errors);
            error(errors);
        });
}
