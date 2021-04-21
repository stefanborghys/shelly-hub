const axios = require('axios');
const Shelly = require('../domain/common/shelly');

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
     * @returns {[Shelly]} An array of found Shelly devices
     */
    async searchForShellys(){
        let part1 = 192, part2 = 168, part3 = 1;
        let part4 = 1;

        const searches = [];
        for (; part4<255; part4++){
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
    searchForShellyOnIpAddress(ipAddress){
        const isOk = (status) => status === 200;

        return axios.get(`http://${ipAddress}:80/shelly`, {timeout: 2000, validateStatus: isOk })
            .then((response) => {
                return new Promise((resolve, reject) => {
                    if(response.headers['content-type'] === 'application/json'){
                        const {type, mac, auth, fw} = response.data;

                        // Returned request is a Node JS http.ClientRequest instance
                        // @see https://nodejs.org/api/http.html#http_class_http_clientrequest
                        const {host} = response.request;

                        resolve(Shelly.of(type, mac, host, auth, fw));
                    }
                    reject();
                  });
            });
    }

}

/**
 * Exports a singleton ShellyService.
 * 
 * @module ShellyService
 */
module.exports = new ShellyService();