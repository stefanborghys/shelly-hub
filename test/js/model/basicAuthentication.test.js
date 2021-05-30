const BasicAuthentication = require('../../../src/js/model/basicAuthentication');
const ValidationError = require('../../../src/js/model/error/validationError');

describe('BasicAuthentication', () => {
  function base64Decode(text) {
    const buffer = Buffer.from(text, 'base64');
    return buffer.toString('utf8');
  }

  expect.extend({

    /**
     * Checks if a value is a valid basic authentication.
     *
     * @param {!string} received - The value to verify
     * @param {!string} userId - The userId used for basic authentication
     * @param {!string} password - The password used for basic authetication
     * @returns {object} The validation state and message
     */
    toBeABasicAuthenticationWith(received, userId, password) {
      const regex = /^Basic (?<base64EncodedText>.*)/;

      if (!regex.test(received)) {
        return {
          message: () => `expected '${received}' to be of format 'Basic <base64EncodedText>'`,
          pass: false,
        };
      }

      const match = regex.exec(received);
      const { base64EncodedText } = match.groups;
      const base64DecodedText = base64Decode(base64EncodedText);
      if (base64DecodedText !== `${userId}:${password}`) {
        return {
          message: () => `expected base64 encoded text '${base64EncodedText}' to be equal to '${userId}:${password}' but received decoded text '${base64DecodedText}'`,
          pass: false,
        };
      }

      return {
        message: () => `'${received}' is a valid Basic Authentication`,
        pass: true,
      };
    },
  });

  test('A valid basic authentication can be constructed', () => {
    const userId = 'test-user-id';
    const password = 'test-password';

    const basicAuthentication = new BasicAuthentication(userId, password);

    const authentication = basicAuthentication.authorization;
    expect(authentication).toBeABasicAuthenticationWith(userId, password);

    expect(basicAuthentication.toString()).toEqual(authentication);
  });

  test('A valid basic authentication can be staticly created', () => {
    const userId = 'test-user-id';
    const password = 'test-password';

    const basicAuthentication = BasicAuthentication.of(userId, password);

    const authentication = basicAuthentication.authorization;
    expect(authentication).toBeABasicAuthenticationWith(userId, password);

    expect(basicAuthentication.toString()).toEqual(authentication);
  });

  test('A text can be base 64 encoded', () => {
    const text = 'test-user-id';

    const base64EncodedText = BasicAuthentication.base64Encode(text);
    expect(base64EncodedText).not.toEqual(text);
    expect(base64Decode(base64EncodedText)).toEqual(text);
  });

  describe('validateUserId', () => {
    test('null should throw a ValidationError', () => {
      expect(() => BasicAuthentication.validateUserId(null)).toThrow(new ValidationError('The userId is mandatory and cannot be empty'));
    });

    test('undefined should throw a ValidationError', () => {
      expect(() => BasicAuthentication.validateUserId(undefined)).toThrow(new ValidationError('The userId is mandatory and cannot be empty'));
    });

    test('A number should throw a TypeError', () => {
      expect(() => BasicAuthentication.validateUserId(5)).toThrow(new TypeError('The userId is not of type string'));
    });

    test('An empty string should throw a ValidationError', () => {
      expect(() => BasicAuthentication.validateUserId('')).toThrow(new ValidationError('The userId is mandatory and cannot be empty'));
    });

    test('A \'$\' character string should throw a ValidationError', () => {
      expect(() => BasicAuthentication.validateUserId('$')).toThrow(new ValidationError('The userId is invalid'));
    });

    test('A \':\' character string should throw a ValidationError', () => {
      expect(() => BasicAuthentication.validateUserId(':')).toThrow(new ValidationError('The userId is invalid'));
    });

    test('A userId with more than 100 characters should throw a ValidationError', () => {
      expect(() => BasicAuthentication.validateUserId('a'.repeat(101))).toThrow(new ValidationError('The userId is invalid'));
    });

    test('A valid userId should return the userId', () => {
      const userId = 'test-user-id';
      expect(BasicAuthentication.validateUserId(userId)).toEqual(userId);
    });

    test('A valid userId with 100 characters should return the userId', () => {
      const userId = 't'.repeat(100);
      expect(BasicAuthentication.validateUserId(userId)).toEqual(userId);
    });
  });

  describe('validatePassword', () => {
    test('null should throw a ValidationError', () => {
      expect(() => BasicAuthentication.validatePassword(null)).toThrow(new ValidationError('The password is mandatory and cannot be empty'));
    });

    test('undefined should throw a ValidationError', () => {
      expect(() => BasicAuthentication.validatePassword(undefined)).toThrow(new ValidationError('The password is mandatory and cannot be empty'));
    });

    test('A number should throw a TypeError', () => {
      expect(() => BasicAuthentication.validatePassword(5)).toThrow(new TypeError('The password is not of type string'));
    });

    test('An empty string should throw a ValidationError', () => {
      expect(() => BasicAuthentication.validatePassword('')).toThrow(new ValidationError('The password is mandatory and cannot be empty'));
    });

    test('An \'$\' character string should throw a ValidationError', () => {
      expect(() => BasicAuthentication.validatePassword('$')).toThrow(new ValidationError('The password is invalid'));
    });

    test('A \':\' character string should throw a ValidationError', () => {
      expect(() => BasicAuthentication.validatePassword(':')).toThrow(new ValidationError('The password is invalid'));
    });

    test('A password with more than 100 characters should throw a ValidationError', () => {
      expect(() => BasicAuthentication.validatePassword('a'.repeat(101))).toThrow(new ValidationError('The password is invalid'));
    });

    test('A valid password should return the password', () => {
      const password = 'test-password';
      expect(BasicAuthentication.validatePassword(password)).toEqual(password);
    });

    test('A valid password with 100 characters should return the password', () => {
      const password = 'l'.repeat(100);
      expect(BasicAuthentication.validatePassword(password)).toEqual(password);
    });
  });
});
