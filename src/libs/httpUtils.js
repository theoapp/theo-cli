import ApiError from './apierror';

const fetch = require('node-fetch');

const getAuthHeader = headers => {
  headers['Authorization'] = 'Bearer ' + process.env.THEO_TOKEN;
};

const buildUrl = path => {
  return process.env.THEO_URL + path;
};

const execute = async (method, path, data, contentType) => {
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
  let response;
  try {
    response = await fetch(buildUrl(path), fetchOpts);
  } catch (ex) {
    // Low level error: timeouts
    throw ex;
  }
  if (response) {
    if (response.status === 204) {
      return true;
    }
    const resContentLength = response.headers.get('content-length');
    const retContentType = response.headers.get('content-type');
    if (response.status >= 500) {
      // Server's fault.. just raise the error
      if (resContentLength > 0) {
        const json = await _parseJsonBody(retContentType, response);
        if (json === false) {
          // generic error
          throw ApiError.getError(response.status, response.message, response);
        }
        throw ApiError.getError(json.error, json.message, response);
      }
      throw ApiError.getError(response.status, response.message, response);
    }
    if (response.status >= 400) {
      // Our fault..
      // Session expired?
      if (response.status === 401) {
        // Force logout..
        // But I need dispatch
      }
      if (resContentLength > 0) {
        const json = await _parseJsonBody(retContentType, response);
        if (json === false) {
          // generic error
          throw ApiError.getError(response.status, response.message, response);
        }
        throw ApiError.getError(json.reason, json.data, response);
      }
      throw ApiError.getError(response.status, response.message, response);
    }
    if (resContentLength === 0) {
      return true;
    }
    const json = await _parseJsonBody(retContentType, response);
    if (json === false) {
      return response.text();
    }
    return json;
  }
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

async function _parseJsonBody(contentType, response) {
  let ret = false;
  if (contentType.includes('application/json')) {
    try {
      ret = await response.json();
    } catch (e) {
      console.log('error while parsing json response...', e.message);
    }
  }
  return ret;
}
