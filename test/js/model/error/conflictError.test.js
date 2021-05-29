const ConflictError = require('../../../../src/js/model/error/conflictError');

describe('ConflictError', () => {
  test('The status text is equal to the one set during creation', () => {
    const statusText = 'Test status text';
    const conflictError = new ConflictError(statusText);

    expect(conflictError.message).toEqual(statusText);
  });

  test('The status code is 409', () => {
    expect(new ConflictError('').statusCode).toEqual(409);
  });
});
