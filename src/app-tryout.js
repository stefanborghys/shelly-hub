const http = require('http');
const { URL } = require('url');

const hostname = '192.168.1.183';
const port = 1234;

const logRequest = function (request, body = '') {
  const { method, url, headers } = request;
  console.group();
  console.count(`${method} http://${hostname}:${port}${url}`);
  if (headers) {
    console.info('Headers:');
    console.table(headers);
  }

  if (body) {
    console.info('Body:', body);
  }
  console.groupEnd();
};

const server = http.createServer((request, response) => {
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    logRequest(request, body);

    // url: '/?hum=79&temp=20.75'
    // headers['user-agent']: 'Shelly/20200812-091311/v1.8.0@8acf41b0 (SHHT-1)'
    const { url, headers } = request;
    const userAgent = headers['user-agent'];
    if (userAgent && (userAgent.startsWith('Shelly') || true)) {
      const requestURL = new URL(url, `http://${hostname}:${port}`);
      const sensorData = { date: new Date() };
      requestURL.searchParams.forEach((value, name, searchParams) => {
        sensorData[name] = value;
      });
      console.log(sensorData);
    }
  });

  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello Worldz');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
