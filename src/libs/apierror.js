class ApiError extends Error {
  static getError(message, detail, response) {
    const err = new Error(message);
    err.detail = detail;
    err.http_response = response;
    return err;
  }
}

export default ApiError;
