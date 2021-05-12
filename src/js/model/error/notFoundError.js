const StatusError = require('./statusError');

class NotFoundError extends StatusError {
  constructor(statusText = 'Could not found the requested instance!') {
    super(404, statusText);
  }
}

module.exports = NotFoundError;
