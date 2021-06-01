const axios = require('axios');

const StatusService = require('../../../src/js/service/statusService');
const Status = require('../../../src/js/model/status');
const Device = require('../../../src/js/model/device');
const IpV4Address = require('../../../src/js/model/ipV4Address');
const BasicAuthentication = require('../../../src/js/model/basicAuthentication');

jest.mock('axios');

describe('StatusService', () => {
  describe('getStatus', () => {
    test('The status can be retrieved for an unauthenticated device', async () => {
      const ip = '1.2.3.4';
      const response = {
        headers: {
          'content-type': 'application/json',
        },
        data: {
          has_update: true,
        },
      };
      axios.get.mockResolvedValue(response);

      const device = new Device('test-shelly', IpV4Address.of(ip));

      const status = await StatusService.getStatus(device);
      expect(status).toBeInstanceOf(Status);
      expect(status.updatable).toEqual(true);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`http://${ip}:80/status`, { headers: {}, timeout: 2000, validateStatus: expect.anything() });
    });

    test('The status can be retrieved for an authenticated device', async () => {
      const ip = '10.11.12.13';
      const response = {
        headers: {
          'content-type': 'application/json',
        },
        data: {
          has_update: false,
        },
      };
      axios.get.mockResolvedValue(response);

      const basicAuthentication = BasicAuthentication.of('test-id', 'test-password');
      const device = new Device('test-shelly', IpV4Address.of(ip), basicAuthentication);

      const status = await StatusService.getStatus(device);
      expect(status).toBeInstanceOf(Status);
      expect(status.updatable).toEqual(false);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`http://${ip}:80/status`, { headers: { Authorization: basicAuthentication.authorization }, timeout: 2000, validateStatus: expect.anything() });
    });

    test('Unexpected content-type is rejected', async () => {
      const ip = '5.4.3.2';
      const response = {
        headers: {
          'content-type': 'application/xml',
        },
      };
      axios.get.mockResolvedValue(response);

      const device = new Device('test-shelly', IpV4Address.of(ip));
      await expect(() => StatusService.getStatus(device)).rejects.toThrow(new Error('The status response could not be processed'));

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`http://${ip}:80/status`, { headers: {}, timeout: 2000, validateStatus: expect.anything() });
    });
  });
});
