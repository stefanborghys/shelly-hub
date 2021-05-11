const express = require('express');

const router = express.Router();

const Device = require('../model/device');
const HttpError = require('../model/exception/http/httpError');

const deviceService = require('../service/deviceService');
const ShellyService = require('../service/shellyService');
const StatusService = require('../service/statusService');

const deviceToJson = (device) => ({
  identifier: device.identifier,
  ip: device.ipV4Address.ip,
  hasAuthentication: device.hasAuthentication,
});

router.post('/', (request, response) => {
  const { ip, userId, password } = request.body;

  ShellyService.searchForShellyOnIpAddress(ip).then((shelly) => {
    const { identifier, isAuthenticationRequired } = shelly;

    const device = isAuthenticationRequired
      ? Device.withAuthentication(identifier, ip, userId, password)
      : Device.withoutAuthentication(identifier, ip);

    return device;
  }).then(async (device) => {
    if (device.hasAuthentication) {
      // Verify authentication
      await StatusService.getStatus(device);
    }
    return device;
  }).then((device) => {
    try {
      deviceService.add(device);
    } catch (error) {
      if (error instanceof TypeError) {
        response.status(409).send(error.message);
      }
      throw error;
    }

    response.status(200).json(deviceToJson(device));
  })
    .catch((error) => {
      if (error instanceof HttpError) {
        response.status(error.statusCode).send();
      } else {
        console.error('Intercepted unexpected error', error);
        response.status(500).send();
      }
    });
});

router.get('/', (request, response) => response.status(200).json(deviceService.all()
  .map((device) => deviceToJson(device))));

module.exports = router;
