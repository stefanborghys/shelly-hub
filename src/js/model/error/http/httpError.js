class HttpError extends Error {
  constructor(statusCode, ...params) {
    super(...params);
    this._statusCode = statusCode;
  }

  get statusCode() {
    return this._statusCode;
  }
}

module.exports = HttpError;
