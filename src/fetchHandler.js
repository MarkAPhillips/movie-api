export const handleResponse = (res) => {
    return res.json()
        .then((json) => {
            if (!res.ok) {
                const errorObj = {
                    status: response.status,
                    statusText: response.statusText,
                };
                return Promise.reject({ ...json, ...errorObj });
            }
            return json;
        });
}

export const handleError = (err, url) => console.log(`Unhandled error connecting to ${url}  - ${err || 'Unknown'}`);
