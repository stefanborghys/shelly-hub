const StatusError = require('./statusError');

class ConflictError extends StatusError {
  constructor(message) {
    super(409, message);
  }
}

module.exports = ConflictError;
