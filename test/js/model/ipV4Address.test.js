const IpV4Address = require('../../../src/js/model/ipV4Address');
const ValidationError = require('../../../src/js/model/error/validationError');

describe('IpV4Address', () => {
  test('A IpV4Address can be constructed', () => {
    const ip = '192.168.1.12';

    const ipV4Address = new IpV4Address(ip);

    expect(ipV4Address.ip).toEqual(ip);
    expect(ipV4Address.toString()).toEqual(`${ip}`);
  });

  test('A IpV4Address can be staticly created', () => {
    const ip = '192.168.1.23';

    const ipV4Address = IpV4Address.of(ip);

    expect(ipV4Address.ip).toEqual(ip);
    expect(ipV4Address.toString()).toEqual(`${ip}`);
  });

  describe('validateIp', () => {
    test('null should throw a ValidationError', () => {
      expect(() => IpV4Address.validateIp(null)).toThrow(new ValidationError('The ip is not a valid version 4 IP address'));
    });

    test('undefined should throw a ValidationError', () => {
      expect(() => IpV4Address.validateIp(undefined)).toThrow(new ValidationError('The ip is not a valid version 4 IP address'));
    });

    test('A text should throw a ValidationError', () => {
      expect(() => IpV4Address.validateIp('test-ip')).toThrow(new ValidationError('The ip is not a valid version 4 IP address'));
    });

    test('An empty string should throw a ValidationError', () => {
      expect(() => IpV4Address.validateIp('')).toThrow(new ValidationError('The ip is not a valid version 4 IP address'));
    });

    test('An IP v6 should throw a ValidationError', () => {
      expect(() => IpV4Address.validateIp('2001:4860:4860::8888')).toThrow(new ValidationError('The ip is not a valid version 4 IP address'));
    });

    test('An invalid IP v4 should throw a ValidationError', () => {
      expect(() => IpV4Address.validateIp('1.2.3.256')).toThrow(new ValidationError('The ip is not a valid version 4 IP address'));
    });

    test('A valid IP v4 should return the identifier', () => {
      const ip = '192.168.2.14';
      expect(IpV4Address.validateIp(ip)).toEqual(ip);
    });
  });
});
