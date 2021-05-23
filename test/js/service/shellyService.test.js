const axios = require('axios');

const ShellyService = require('../../../src/js/service/shellyService');
const Shelly = require('../../../src/js/model/shelly');

jest.mock('axios');

describe('ShellyService', () => {
  describe('searchForShellyOnIpAddress', () => {
    test('A Shelly is found on given IP address', async () => {
      const ip = '1.2.3.4';
      const response = {
        headers: {
          'content-type': 'application/json',
        },
        data: {
          type: 'test-type',
          mac: 'test-mac',
          auth: true,
          fw: 'test-firmware-version',
        },
        request: {
          host: ip,
        },
      };
      axios.get.mockResolvedValue(response);

      const shelly = await ShellyService.searchForShellyOnIpAddress(ip);
      expect(shelly).toBeInstanceOf(Shelly);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`http://${ip}:80/shelly`, { timeout: 2000, validateStatus: expect.anything() });
    });
  });
});
