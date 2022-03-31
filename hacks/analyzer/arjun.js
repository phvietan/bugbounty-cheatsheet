const { errorLog } = require('@drstrain/drutil');
const { packetQL } = require('../libs/init');
const { exit } = require('process');

const shadelessUrl = 'http://app.drstra.in/timeTravel?range=5&requestPacketId=';

const method = 'POST';
const origin = 'https://aa.google.com';
const path = '/u/0/_/gog/get';
async function main() {
  const p = await packetQL.setAll(true).setThreshold(100).query({
    method,
    origin,
    path,
  });
  if (p.length === 0) errorLog('Not found');
  else {
    if (p.length > 1) errorLog('Too many match');
    else {
      const packet = p[0];
      console.log(`${shadelessUrl}${packet.requestPacketId}`);
    }
  }
  exit(0);
}
main();
