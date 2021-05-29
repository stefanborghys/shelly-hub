const UnauthorizedError = require('../../../../src/js/model/error/unauthorizedError');

describe('UnauthorizedError', () => {
  test('The status text is equal to the one set during creation', () => {
    const statusText = 'Test status text';
    const unauthorizedError = new UnauthorizedError(statusText);

    expect(unauthorizedError.message).toEqual(statusText);
  });

  test('The status text is equal to the default text', () => {
    expect(new UnauthorizedError().message).toEqual('Could not authenticate, please verify the credentials!');
  });

  test('The status code is 401', () => {
    expect(new UnauthorizedError().statusCode).toEqual(401);
  });
});
