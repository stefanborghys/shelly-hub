const Model = require('../../../src/js/model/model');

describe('Model', () => {
  test('A Model can be constructed', () => {
    const identifier = 'test-shelly';

    const model = new Model(identifier);

    expect(model.identifier).toEqual(identifier);
    expect(model.toString()).toEqual(`${identifier}`);
  });

  test('A Model can be staticly created', () => {
    const identifier = 'test-shelly';

    const model = Model.of(identifier);

    expect(model.identifier).toEqual(identifier);
    expect(model.toString()).toEqual(`${identifier}`);
  });

  describe('validateIdentifier', () => {
    test('null should throw a TypeError', () => {
      expect(() => Model.validateIdentifier(null)).toThrow(new TypeError('The identifier is mandatory and cannot be empty'));
    });

    test('undefined should throw a TypeError', () => {
      expect(() => Model.validateIdentifier(undefined)).toThrow(new TypeError('The identifier is mandatory and cannot be empty'));
    });

    test('A number should throw a TypeError', () => {
      expect(() => Model.validateIdentifier(5)).toThrow(new TypeError('The identifier is not of type string'));
    });

    test('An empty string should throw a TypeError', () => {
      expect(() => Model.validateIdentifier('')).toThrow(new TypeError('The identifier is mandatory and cannot be empty'));
    });

    test('A valid identifier should return the identifier', () => {
      const identifier = 'test-shelly';
      expect(Model.validateIdentifier(identifier)).toEqual(identifier);
    });
  });
});
