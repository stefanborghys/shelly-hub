const http = require('http');
const { spawn } = require('child_process');

const TimeoutUtils = require('./timeoutUtils');

/**
 * Shelly-Hub wrapper which allows to interact with a running application.
 * Or allows to start a new one.
 * 
 * @class
 * @since 1.0.0
 */
class ShellyHub {

  /**
   * Checks if a Shelly-Hub is up and running by requesting it's status.
   * 
   * @param {!number} port - The Shelly-Hub's port number
   * 
   * @returns {Promise} returns true when up, otherwise false or an error when something went wrong
   * @since 1.0.0
   */
  static isUp(port) {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:${port}/api/hub/status`, {
        timeout: 1000,
      }, (response) => {
        const { statusCode } = response;
        const contentType = response.headers['content-type'];

        if (statusCode === 200 && contentType.startsWith('application/json')) {
          response.setEncoding('utf8');
          let data = '';
          response.on('data', (chunk) => { data += chunk; });
          response.on('end', () => {
            try {
              const parsedData = JSON.parse(data);
              console.debug(`Received Shelly-Hub's status: ${data}`);
              resolve(parsedData.status === 'up');
            } catch (error) {
              reject(error);
            }
          });
        }
      }).on('error', () => resolve(false));
    });
  }

  /**
   * Starts a new Shelly-Hub on given port.
   * 
   * @param {!string} pathToApp - The path to the Shelly-Hub's app.js file
   * @param {!number} port - The Shelly-Hub's port number
   * @returns {Promise} returns true when started, otherwise an error 
   * @since 1.0.0
   */
  static start(pathToApp, port) {
    const appChildProcess = spawn('node', [pathToApp, `--port=${port}`]);

    appChildProcess.stdout.on('data', (data) => console.debug(`Shelly-Hub: ${data}`));

    const hasError = new Promise((resolve, reject) => appChildProcess.on('error', (error) => reject(error)));

    const isClosed = new Promise((resolve, reject) => appChildProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`🔥 Shelly-Hub closed with code ${code}`));
      }
    }));

    const isUp = new Promise((resolve) => {
      (async () => {
        let isHubUp = false;
        do {
          console.info('🛎  Requesting Shelly-Hub\'s status ...');
          const [isShellyHubUp] = await Promise.all([ // eslint-disable-line no-await-in-loop
            ShellyHub.isUp(port), TimeoutUtils.resolveAfterNumberOfMilliseconds(300),
          ]);
          isHubUp = isShellyHubUp;
        } while (!isHubUp);
        resolve('🚀 The Shelly-Hub is up!');
      })();
    });

    return Promise.race([isUp, hasError, isClosed,
      TimeoutUtils.rejectAfterNumberOfMilliseconds(60000, new Error('Timeout after 60s trying to connect to the Shelly Hub')),
    ]).then((message) => {
      console.info(message);
      return true;
    }).catch((error) => {
      console.error(`🔥 Forced to kill the Shelly-Hub, due to error:\n${error.message}`);
      appChildProcess.kill('SIGTERM');
      throw error;
    });
  }

  /**
   * Tries to stop a running Shelly-Hub by calling it's stop endpoint.
   * 
   * @param {!number} port - The Shelly-Hub's port number
   * @returns {Promise} returns true when stopped, otherwise an error 
   * @since 1.0.0
   */
  static stop(port) {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:${port}/api/hub/stop`, { timeout: 1000 }, (response) => resolve(response.statusCode === 200))
        .on('error', (error) => reject(error));
    });
  }
}

/**
 * Exports a Shelly-Hub wrapper.
 * Mainly usable for integration testing purposes.
 * 
 * @module
 * @since 1.0.0
 */
module.exports = ShellyHub;
