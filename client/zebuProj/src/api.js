import { ACCESS_TOKEN, BASE_URL } from './constants';

const authorizedFetch = async (url, options) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };
  const modifiedOptions = { ...options, headers };
  console.log({url});
  console.log({modifiedOptions});
  return fetch(url, modifiedOptions);
};


const api = {

  get: async (url, options = {}) => {
    const response = await authorizedFetch(url, { ...options, method: 'GET' });
    return response.json();
  },

  post: async (url, data = {}, options = {}) => {
    const requestOptions = {
      ...options,
      method: 'POST',
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await authorizedFetch(url, requestOptions);
    console.log("response thing",response);
    return response.json();
  },

};

export default api;
