import axios from 'axios';

const defaults = {
  headers: () => ({
    'Content-Type': 'application/json'
    // Authorization: ,
  }),
  error: {
    code: 'ERROR',
    message: 'something went wrong',
    status: 503,
    data: {}
  }
};

const api = (method, url, body) =>
  new Promise((resolve, reject) => {
    axios({
      url: url,
      method,
      headers: defaults.headers,
      params: body || undefined,
      data: body || undefined
    }).then(response => {
        resolve(response.data)
    },
    error => {reject(error)}
    )
  });


  