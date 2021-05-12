const StatusError = require('./statusError');

class UnknownError extends StatusError {
  constructor(statusCode = 500, statusText) {
    super(statusCode, statusText);
  }
}

module.exports = UnknownError;
