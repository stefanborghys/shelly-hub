const axios = require('axios');
const Shelly = require('../model/shelly');
const IpV4Address = require('../model/ipV4Address');

/**
 * Shelly service allowing shelly devices to be found in the local network.
 *
 * @class
 * @since 1.0.0
 */
class ShellyService {
  /**
   * Search for Shelly devices in the local network.
   *
   * @async
   * @static
   * @returns {Shelly[]} An array of found Shelly devices
   * @since 1.0.0
   */
  static async searchForShellys() {
    const part1 = 192; const part2 = 168; const
      part3 = 1;
    let part4 = 1;

    const searches = [];
    for (; part4 < 255; part4 += 1) {
      searches.push(ShellyService.searchForShellyOnIpAddress(`${part1}.${part2}.${part3}.${part4}`));
    }

    const results = await Promise.allSettled(searches);
    return results.filter((result) => result.status === 'fulfilled')
      .map((result) => result.value);
  }

  /**
   * Search for Shelly basic information on given IP address.
   *
   * @static
   * @param {!string} ipAddress - The IP address to be requested
   *
   * @see https://shelly-api-docs.shelly.cloud/#shelly
   * @returns {Promise<Shelly>} The Shelly device's basic information when available
   * @since 1.0.0
   */
  static searchForShellyOnIpAddress(ipAddress) {
    const ipV4Address = IpV4Address.of(ipAddress);

    const isOk = (status) => status === 200;

    return axios.get(`http://${ipV4Address.ip}:80/shelly`, { timeout: 2000, validateStatus: isOk })
      .then((response) => {
        if (response.headers['content-type'] === 'application/json') {
          const {
            type, mac, auth, fw,
          } = response.data;

          // Returned request is a Node JS http.ClientRequest instance
          // @see https://nodejs.org/api/http.html#http_class_http_clientrequest
          const { host } = response.request;

          return Shelly.of(type, mac, host, auth, fw);
        }
        throw new Error('The shelly response could not be processed');
      });
  }
}

/**
 * Exports ShellyService.
 * Providing methods to search for Shelly devices in the local network.
 *
 * @module
 * @since 1.0.0
 */
module.exports = ShellyService;
