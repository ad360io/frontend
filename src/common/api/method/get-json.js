export const getJson = (url, {data, authToken, headers}) => {
    return fetch(`${url}${data ? `?${buildQuery1(data)}` : ``}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            ...headers
        }
    });
};

const buildQuery = (data) => {
    return Object.keys(data).filter((key) => data[key] != null).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&")
};

const buildQuery1 = (data) => {
    return Object.keys(data).filter((key) => data[key] != null).map((key) => key + "=" + data[key]).join("&")
};
