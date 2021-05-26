const http = require('http');
const { spawn } = require('child_process');

const TimeoutUtils = require('./timeoutUtils');

/**
 * @class
 * @since 1.0.0
 */
class ShellyHub {
  static isUp() {
    return new Promise((resolve, reject) => {
      http.get('http://localhost:4000/api/hub/status', {
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

  static start(pathToApp) {
    const appChildProcess = spawn('node', [pathToApp]);

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
            ShellyHub.isUp(), TimeoutUtils.resolveAfterNumberOfMilliseconds(300),
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

  static stop() {
    return new Promise((resolve, reject) => {
      http.get('http://localhost:4000/api/hub/stop', { timeout: 1000 }, (response) => resolve(response.statusCode === 200))
        .on('error', (error) => reject(error));
    });
  }
}

module.exports = ShellyHub;
