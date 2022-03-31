const fs = require('fs');
const http = require('http');

var id = 0;
var line = 0;

const myLog = (msg) => {
  console.log(msg);
}

const craftPayload = (req, data) => {
  myLog(`${req.method} ${req.url} HTTP/${req.httpVersion}\r`);
  for (let i = 0; i < req.rawHeaders.length; i += 2) {
    const key = req.rawHeaders[i];
    const value = req.rawHeaders[i + 1];
    myLog(`${key}: ${value}\r`);
  }
  myLog(`\r`);
  myLog(data);
}

const requestListener = async function (req, res) {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const data = Buffer.concat(buffers).toString();
  myLog(`================  PAYLOAD ID ${++id}  ================`);
  craftPayload(req, data);
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(2344, '0.0.0.0', () => {
  console.log('running on port 2344');
});