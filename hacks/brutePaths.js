const {system} = require('@drstrain/drutil');
const { FuzzStatus } = require('@drstrain/shadeless-lib');

const { pathQL, packetQL } = require('./libs/init');

async function runStrangeBust(url, packet) {
  const args = ['run', '-u', url];
  let cmd = `strangebust run  -u "${url}"`;
  if (packet) packet.requestHeaders.forEach(p => {
    if (!p.toLowerCase().includes('content-length')) {
      cmd += ` --header ${p}`;
      args.push('--header');
      args.push(p);
    }
  });
  console.log(`Command: ${cmd}`);
  await system('strangebust', args);
}

async function brute(paths) {
  console.log('About to brute following urls');
  console.log(paths.map(p => `${p.origin}${p.path}`));
  console.log("=============================");
  for (let i = 0; i < paths.length; ++i) {
    const url = `${paths[i].origin}${paths[i].path}`;
    const { requestPacketId } = paths[i];
    const parsedPacket = await packetQL.queryRequestPacketId(requestPacketId);
    await runStrangeBust(url, parsedPacket);
    await pathQL.setQueryDone(paths[i]); // Set done 1 paths[i] only
  }
}

async function main() {
  const paths = await pathQL.setStatus(FuzzStatus.TODO).query();
  await brute(paths.slice(0, 5));
  process.exit(0);
}

main();