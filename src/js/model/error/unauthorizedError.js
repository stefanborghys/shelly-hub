const StatusError = require('./statusError');

class UnauthorizedError extends StatusError {
  constructor(statusText = 'Could not authenticate, please verify the credentials!') {
    super(401, statusText);
  }
}

module.exports = UnauthorizedError;
