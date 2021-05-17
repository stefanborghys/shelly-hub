const axios = require('axios');
const Status = require('../model/status');

/**
 * Status service retrieving current device status information.
 *
 * @class
 * @since 1.0.0
 */
class StatusService {
  /**
   * Get the device's current status information.
   *
   * @static
   * @param {!Device} device - The device to request the status for
   *
   * @see https://shelly-api-docs.shelly.cloud/#status
   * @returns {Promise<Status>} The device's current status
   * @since 1.0.0
   */
  static getStatus(device) {
    const { ipV4Address, hasAuthentication, basicAuthentication } = device;

    const isOk = (status) => status === 200;

    const headers = {};
    if (hasAuthentication) {
      headers.Authorization = basicAuthentication.authorization;
    }

    const config = { headers, timeout: 2000, validateStatus: isOk };

    return axios.get(`http://${ipV4Address.ip}:80/status`, config)
      .then((response) => new Promise((resolve, reject) => {
        if (response.headers['content-type'] === 'application/json') {
          const updatable = response.data.has_update;
          resolve(Status.of(updatable));
        }
        reject();
      }));
  }
}

/**
 * Exports StatusService.
 * Providing methods to retrieve the current device status information.
 *
 * @module
 * @since 1.0.0
 */
module.exports = StatusService;
