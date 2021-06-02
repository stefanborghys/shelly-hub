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

  test('The Shelly-Hub should be up', () => {
    console.info('🚦 The Shelly-Hub should be up');

    return requestShellyHub.get('/api/hub/status')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual({ status: 'up' });
      });
  });

  test('Initially no devices should be found when none are stored', () => {
    console.info('🚦 No devices should be found when none are stored');

    return requestShellyHub.get('/api/device')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200, [])
      .expect((response) => {
        expect(response.body).toHaveLength(0);
      });
  });

  test('No device should be found by ID, when using an unknown ID', () => {
    console.info('🚦 No device should be found by ID, when using an unknown ID');

    const id = '1t2e3s4t5';

    return requestShellyHub.get(`/api/device/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(404)
      .expect((response) => {
        expect(response.body).toEqual({ message: `Device with id '${id}' could not be found` });
      });
  });

  test('Searching for shellys', () => {
    console.info('🚦 Searching for shellys');

    return requestShellyHub.get('/api/shelly/search')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(expect.any(Array));
      });
  });

  test('No shelly should be found by IP, when searching using an ip for an unexisting shelly device', () => {
    console.info('🚦 No shelly should be found by IP, when searching using an ip for an unexisting shelly device');

    const ip = '192.168.123.123';

    return requestShellyHub.get(`/api/shelly/search/${ip}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(404)
      .expect((response) => {
        expect(response.body).toEqual({ message: `No Shelly could be found on address: '${ip}'` });
      });
  });

  test('No device should be able to be added, when using an unexisting IP', () => {
    console.info('🚦 No device should be able to be added, when using an unexisting IP');

    const ip = '192.168.123.123';

    return requestShellyHub.post('/api/device')
      .set('Accept', 'application/json')
      .send({ ip })
      .expect('Content-Type', /application\/json/)
      .expect(404)
      .expect((response) => {
        expect(response.body).toEqual({ message: `Device with ip '${ip}' could not be found` });
      });
  });

  afterAll(() => {
    console.info('⛔ Stopping the Shelly-Hub');
    return ShellyHub.stop(port);
  });
});
