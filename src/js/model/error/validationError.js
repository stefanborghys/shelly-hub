const StatusError = require('./statusError');

class ValidationError extends StatusError {
  constructor(message) {
    super(400, message);
  }
}

module.exports = ValidationError;
