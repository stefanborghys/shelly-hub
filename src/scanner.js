const http = require('http');
const Shelly = require('./api/domain/common/shelly')

function scan(){
    console.log('start scan');

    let part1 = 192;
    let part2 = 168;
    let part3 = 1;
    let part4 = 1;
    for (; part4<255; part4++){
        let ip4 = `http://${part1}.${part2}.${part3}.${part4}:80/shelly`;
        
        http.get({host:`${part1}.${part2}.${part3}.${part4}`, port:80, path:'/shelly'}, async (response) => {
            const { method, url, headers } = response;
            const contentType = headers['content-type'];

            if(response.statusCode===200 && contentType === 'application/json'){
                response.setEncoding('utf8');
                const jsonBody = await getBody(response).then(JSON.parse);

                const shelly = Shelly.of(jsonBody.type, jsonBody.mac, jsonBody.auth, jsonBody.fw, jsonBody.longid);

                console.log(`${ip4} => ${jsonBody.type} ${shelly.model}`)
            }

        }).on('error', (error) => {
            //console.error(`${ip4} - ${error.code}`);
        });
    }

}

async function getBody(response) {
    let data = '';
    // The request body's data gets received as a stream of chunks.
    // We concat each 'chunk' into a complete data string.
    response.on('data', (chunk) => { data += chunk; });
  
    // Wait until the stream has 'end'ed
    return new Promise((resolve) => response.on('end', () => resolve(data)));
  }

exports.scan = scan;