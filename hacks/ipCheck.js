const {PacketQL, FuzzStatus} = require('@drstrain/shadeless-lib');
const fs = require('fs/promises');
const {exec,getRandomString} = require('@drstrain/drutil');
const creds = require('./creds.json');

function getHostFromHeaders(headers) {
  for (let i = 0; i < headers.length; ++i) {
    const [key, val] = headers[i].split(': ');
    if (key.toLowerCase() === 'host') return val;
  }
}

async function main() {
  const pql = new PacketQL({
    choosingProject: 'test',
    ...creds,
  });
  const packets = await pql
      .setStatus(FuzzStatus.ANY)
      .setRequestHeader('host:')
      .query();

  const hosts = packets.map(({ requestHeaders }) => getHostFromHeaders(requestHeaders));
  const uniqeHosts = [...new Set(hosts)];

  const randomName = getRandomString(8) + '.txt';
  await fs.writeFile(randomName, uniqeHosts.reduce((prev, now) => prev+now+'\n'), '');

  console.log(`Found ${uniqeHosts.length} hosts, running ip check`);
  const {stdout} = await exec('python3', ['hosts.py', randomName]);
  console.log(stdout);

  await fs.rm(randomName);
  process.exit(0);
}

main();