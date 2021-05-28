const path = require('path');
const request = require('supertest');
const ShellyHub = require('./shellyHub');

describe('Shelly-Hub', () => {
  let requestShellyHub;
  const port = 4001;

  beforeAll(() => ShellyHub.start(path.resolve(__dirname, '../src/app.js'), port)
    .then((result) => {
      requestShellyHub = request(`http://localhost:${port}`);
      return result;
    }));

  test('No devices should be found when none are stored', () => {
    console.info('🚦 No devices should be found when none are stored');

    return requestShellyHub.get('/api/device')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200, [])
      .expect((response) => {
        expect(response.body).toHaveLength(0);
      });
  });

  afterAll(() => {
    console.info('⛔ Stopping the Shelly-Hub');
    return ShellyHub.stop(port);
  });
});
