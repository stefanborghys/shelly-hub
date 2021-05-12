const express = require('express');

const router = express.Router();

const ShellyService = require('../service/shellyService');
const NotFoundError = require('../model/error/notFoundError');

const shellyToJson = (shelly) => ({
  identifier: shelly.identifier,
  mac: shelly.mac,
  ip: shelly.ip,
  authenticationRequired: shelly.isAuthenticationRequired,
  firmwareVersion: shelly.firmwareVersion,
});

router.get('/search', (request, response, next) => {
  ShellyService.searchForShellys()
    .then((shellys) => shellys.map((shelly) => shellyToJson(shelly)))
    .then((shellys) => response.status(200).json(shellys))
    .catch(next);
});

router.get('/search/:ipAddress', (request, response, next) => {
  const { ipAddress } = request.params;

  ShellyService.searchForShellyOnIpAddress(ipAddress).then((shelly) => {
    response.status(200).json(shellyToJson(shelly));
  }).catch(() => {
    throw new NotFoundError(`No Shelly could be found on address: '${ipAddress}'`);
  }).catch(next);
});

module.exports = router;
