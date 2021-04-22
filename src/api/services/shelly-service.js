const axios = require('axios');
const Shelly = require('../domain/common/shelly');
const IpV4Address = require('../domain/common/ip-v4-address');

/**
 * Shelly service allowing shelly devices to be found in the local network.
 *
 * @class
 */
class ShellyService {
  /**
     * Search for Shelly devices in the local network.
     *
     * @async
     * @returns {Shelly[]} An array of found Shelly devices
     */
  async searchForShellys() {
    const part1 = 192; const part2 = 168; const
      part3 = 1;
    let part4 = 1;

    const searches = [];
    for (; part4 < 255; part4 += 1) {
      searches.push(this.searchForShellyOnIpAddress(`${part1}.${part2}.${part3}.${part4}`));
    }

    const results = await Promise.allSettled(searches);
    return results.filter((result) => result.status === 'fulfilled')
      .map((result) => result.value);
  }

  /**
     * Search for Shelly basic information on given IP address.
     *
     * @param {!string} ipAddress - The IP address to be requested
     * @returns {Promise<Shelly>} The Shelly device's basic information when available
     */
  searchForShellyOnIpAddress(ipAddress) {
    const ipV4Address = IpV4Address.of(ipAddress);

    const isOk = (status) => status === 200;

    return axios.get(`http://${ipV4Address.ip}:80/shelly`, { timeout: 2000, validateStatus: isOk })
      .then((response) => new Promise((resolve, reject) => {
        if (response.headers['content-type'] === 'application/json') {
          const {
            type, mac, auth, fw,
          } = response.data;

          // Returned request is a Node JS http.ClientRequest instance
          // @see https://nodejs.org/api/http.html#http_class_http_clientrequest
          const { host } = response.request;

          resolve(Shelly.of(type, mac, host, auth, fw));
        }
        reject();
      }));
  }
}

/**
 * Exports a singleton ShellyService.
 * Providing methods to search for Shelly devices in the local network.
 *
 * @module ShellyService
 */
module.exports = new ShellyService();
