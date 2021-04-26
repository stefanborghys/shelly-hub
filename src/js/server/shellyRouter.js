const express = require('express');

const router = express.Router();

const ShellyService = require('../service/shellyService');

const shellyToJson = (shelly) => ({
  identifier: shelly.identifier,
  mac: shelly.mac,
  ip: shelly.ip,
  authenticationRequired: shelly.isAuthenticationRequired,
  firmwareVersion: shelly.firmwareVersion,
});

router.get('/search', (request, response) => {
  ShellyService.searchForShellys()
    .then((shellys) => shellys.map((shelly) => shellyToJson(shelly)))
    .then((shellys) => response.status(200).json(shellys));
});

router.get('/search/:ipAddress', (request, response) => {
  const { ipAddress } = request.params;

  try {
    ShellyService.searchForShellyOnIpAddress(ipAddress).then((shelly) => {
      response.status(200).json(shellyToJson(shelly));
    }).catch(() => response.status(404).send());
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

module.exports = router;
