const HttpError = require('./httpError');

class UnauthorizedError extends HttpError {
  constructor() {
    super(401);
  }
}

module.exports = UnauthorizedError;
