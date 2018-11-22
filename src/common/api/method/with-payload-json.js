export const withPayloadJson = (method) => (url, {data, authToken, headers}) => {
    return fetch(
        `${url}`,
        {
            method: method,
            body: data == null ? undefined : JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                ...headers
            },
        }
    );
};

