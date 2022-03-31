const fs = require('fs/promises');
const {system,getRandomString} = require('@drstrain/drutil');

const { packetQL } = require('./libs/init');

function getHostFromHeaders(headers) {
  for (let i = 0; i < headers.length; ++i) {
    const [key, val] = headers[i].split(': ');
    if (key.toLowerCase() === 'host') return val;
  }
}

async function main() {
  const packets = await packetQL
      .setRequestHeader('Host:')
      .query();

  const hosts = packets.map(({ requestHeaders }) => getHostFromHeaders(requestHeaders));
  const uniqeHosts = [...new Set(hosts)];

  const randomName = getRandomString(8) + '.txt';
  await fs.writeFile(randomName, uniqeHosts.reduce((prev, now) => prev+now+'\n'), '');

  console.log(`Found ${uniqeHosts.length} hosts, running ip check`);
  await system('python3', ['hosts.py', randomName]);
  await fs.rm(randomName);
  process.exit(0);
}

main();