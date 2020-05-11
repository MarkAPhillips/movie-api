export const handleResponse = (res) => res.json()
  .then((json) => {
    if (!res.ok) {
      const errorObj = {
        status: res.status,
        statusText: res.statusText,
      };
      return Promise.reject(new Error({ ...json, ...errorObj }));
    }
    return json;
  });

export const handleError = (err, url) => console.log(`Unhandled error connecting to ${url}  - ${err || 'Unknown'}`);
