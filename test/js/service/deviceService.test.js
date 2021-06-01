const DeviceService = require('../../../src/js/service/deviceService');
const ShellyService = require('../../../src/js/service/shellyService');

const Shelly = require('../../../src/js/model/shelly');
const IpV4Address = require('../../../src/js/model/ipV4Address');

const ConflictError = require('../../../src/js/model/error/conflictError');
const NotFoundError = require('../../../src/js/model/error/notFoundError');

jest.mock('../../../src/js/service/shellyService');

describe('DeviceService', () => {
  function mockShellyOnce(ip) {
    const shelly = Shelly.of('test-shelly', 'test-mac', ip, false, 'test-version');
    ShellyService.searchForShellyOnIpAddress.mockResolvedValueOnce(shelly);
  }

  describe('getAll', () => {
    test('At start no devices should be returned', async () => {
      expect(DeviceService.getAll()).toHaveLength(0);
    });

    test('All added devices are returned', async () => {
      const ip1 = '192.168.1.1';
      mockShellyOnce(ip1);

      const ip2 = '192.168.1.2';
      mockShellyOnce(ip2);

      const addedDevices = await Promise.all([DeviceService.add(ip1), DeviceService.add(ip2)]);

      const allDevices = DeviceService.getAll();
      expect(allDevices).toHaveLength(2);
      expect(allDevices).toEqual(expect.arrayContaining(addedDevices));
    });
  });

  describe('add', () => {
    test('A device can be added', async () => {
      const ip = '192.168.2.1';
      mockShellyOnce(ip);

      const addedDevice = await DeviceService.add(ip);

      expect(addedDevice.ipV4Address.ip).toEqual(ip);
      expect(addedDevice.hasAuthentication).toEqual(false);
    });

    test('Adding the same device should throw a ConflictError', async () => {
      const ip = '192.168.2.2';
      mockShellyOnce(ip);
      await DeviceService.add(ip);

      mockShellyOnce(ip);
      await expect(() => DeviceService.add(ip)).rejects.toThrow(new ConflictError(`A device with ip '${ip}' has already been added`));
    });
  });

  describe('findById', () => {
    test('A device can be found', async () => {
      const ip = '192.168.3.1';
      mockShellyOnce(ip);

      const addedDevice = await DeviceService.add(ip);

      const foundDevice = DeviceService.findById(addedDevice.id);
      expect(foundDevice).toEqual(addedDevice);
    });

    test('An unknown device cannot be found', () => {
      const id = '12345test';
      expect(() => DeviceService.findById(id)).toThrow(new NotFoundError(`Device with id '${id}' could not be found`));
    });
  });

  describe('hasDeviceWithIp', () => {
    test('A device is marked added, when looking it up by ip', async () => {
      const ip = '192.168.4.1';
      mockShellyOnce(ip);
      const addedDevice = await DeviceService.add(ip);

      expect(DeviceService.hasDeviceWithIp(addedDevice.ipV4Address)).toEqual(true);
    });

    test('A device is marked not added, when looking up an unknown ip', () => {
      expect(DeviceService.hasDeviceWithIp(IpV4Address.of('1.2.3.4'))).toEqual(false);
    });
  });
});
