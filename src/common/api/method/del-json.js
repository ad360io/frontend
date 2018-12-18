import axios from "axios";
import {buildQuery1} from "./get-json";

export const getJson = (url, {queryParams, authToken, headers}) => {
    return axios(
        {
            url: `${url}${queryParams ? `?${buildQuery1(queryParams)}` : ``}`,
            method: "delete",
            // body: data == null ? undefined : JSON.stringify(data),
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                ...headers
            },
        }
    );
};
