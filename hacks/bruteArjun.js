const {PacketQL, FuzzStatus} = require('@drstrain/shadeless-lib');
const fs = require('fs/promises');
const {exec,getRandomString} = require('@drstrain/drutil');
const creds = require('./creds.json');

const pql = new PacketQL({
  choosingProject: 'test',
  ...creds,
});

async function main() {

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