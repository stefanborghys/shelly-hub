const path = require('path');
const request = require('supertest');
const ShellyHub = require('./shellyHub');

describe('Shelly-Hub', () => {
  let requestShellyHub;

  beforeAll(() => ShellyHub.start(path.resolve(__dirname, '../src/app.js'))
    .then((result) => {
      requestShellyHub = request('http://localhost:4000');
      return result;
    }));

  test('Shelly search', () => {
    console.info('start test');

    return requestShellyHub.get('/api/device')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .expect([]);
  });

  afterAll(() => {
    console.info('⛔ Stopping the Shelly-Hub');
    return ShellyHub.stop();
  });
});
