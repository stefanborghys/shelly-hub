const request = require('supertest');
const express = require('express');
const shellyRouter = require('../../../src/js/server/shellyRouter');
const ShellyService = require('../../../src/js/service/shellyService');
const Shelly = require('../../../src/js/model/shelly');

const app = express();

jest.mock('../../../src/js/service/shellyService');

describe('ShellyRouter', () => {
  beforeAll(() => {
    app.use(express.json());
    app.use('/api/shelly', shellyRouter);
  });

  function createShelly(number) {
    const ip = `192.168.1.${number}`;
    return Shelly.of(`test-type-${number}`, `test-mac-${number}`, ip, false);
  }

  const toJSON = (shelly) => ({
    identifier: shelly.identifier,
    mac: shelly.mac,
    ip: shelly.ip,
    authenticationRequired: shelly.isAuthenticationRequired,
    firmwareVersion: shelly.firmwareVersion,
  });

  test('Search for shellys', () => {
    const shellys = [createShelly(1), createShelly(2), createShelly(3)];

    ShellyService.searchForShellys.mockResolvedValueOnce(shellys);

    return request(app)
      .get('/api/shelly/search')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveLength(shellys.length);

        const expectedShellies = shellys.map(toJSON);

        expect(response.body).toEqual(expectedShellies);

        expect(ShellyService.searchForShellys).toHaveBeenCalledTimes(1);
      });
  });

  test('Search a shelly by IP', () => {
    const shelly = createShelly(1);

    ShellyService.searchForShellyOnIpAddress.mockResolvedValueOnce(shelly);

    return request(app)
      .get(`/api/shelly/search/${shelly.ip}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(toJSON(shelly));

        expect(ShellyService.searchForShellyOnIpAddress).toHaveBeenCalledTimes(1);
      });
  });

  test('Searching a shelly by unknown IP should return a not found status', () => {
    const ip = '192.168.1.123';

    ShellyService.searchForShellyOnIpAddress.mockRejectedValueOnce();

    return request(app)
      .get(`/api/shelly/search/${ip}`)
      .set('Accept', 'application/json')
      .expect(404)
      .expect(() => expect(ShellyService.searchForShellyOnIpAddress).toHaveBeenCalledTimes(1));
  });
});
