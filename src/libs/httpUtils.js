const fetch = require('node-fetch');

const getAuthHeader = headers => {
  headers['Authorization'] = 'Bearer ' + process.env.THEO_TOKEN;
};

const buildUrl = path => {
  return process.env.THEO_URL + path;
};

const execute = (method, path, data, contentType) => {
  const headers = {};
  getAuthHeader(headers);
  const fetchOpts = {
    method,
    headers: headers
  };
  const dataType = typeof data;
  if (dataType !== 'undefined') {
    if (dataType !== 'string') {
      data = JSON.stringify(data);
    }
    headers['Content-Type'] = contentType;
    fetchOpts.body = data;
  }
  return fetch(buildUrl(path), fetchOpts).then(res => {
    if (res.status >= 400) {
      const error = new Error(res.statusText);
      error.http_response = res;
      throw error;
    }
    return res.json();
  });
};

export const get = path => {
  return execute('GET', path);
};

export const del = (path, data, contentType) => {
  return execute('DELETE', path, data, contentType || 'application/json');
};

export const put = (path, data, contentType) => {
  return execute('PUT', path, data, contentType || 'application/json');
};

export const post = (path, data, contentType) => {
  return execute('POST', path, data, contentType || 'application/json');
};
