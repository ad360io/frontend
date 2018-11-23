import {getJson} from './method/get-json';
import {postJson} from './method/post-json';
import {putJson} from './method/put-json';
import {mapValues} from '../utils/utils';

let baseUrl = 'https://marketplacedb.qchain.co';

let getHeaders = (entries) => {
    let ret = {};
    for (let pair of entries) {
        ret[pair[0]] = pair[1]
    }
    return ret;
};

export const createFetcher = (authToken, onUnauthorized) => {
    const parseJsonResp = (resp) => {
        if (resp && resp.status === 401) {
            onUnauthorized();
            return new Promise(() => {}); // Empty promise

        } else if (resp && resp.status === 404) {
            console.warn('API Not found', resp);
            return new Promise(() => {}); // Empty promise

        } else if (resp && resp.status === 400) {
            return Promise.reject(resp.json()); //return error

        } else {
            return resp.json().then((json) => ({
                headers: getHeaders(resp.headers.entries()),
                data: json
            }));
        }
    };

    return mapValues(
        { getJson, postJson, putJson },
        (method) => (url, data, headers = {}) =>
            method(`${baseUrl}${url}`, {data, authToken, headers}).then(parseJsonResp),
    );
};

