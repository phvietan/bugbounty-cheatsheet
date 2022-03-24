const {ParsedPath, FuzzStatus, ParsedPacket} = require('@drstrain/shadeless-lib');
const {systemStr} = require('@drstrain/drutil');

const { pathQL, packetQL } = require('./init');

/**
 * @param {string} url
 * @param {ParsedPacket} packet
 */
async function runStrangeBust(url, packet) {
  let cmd = `strangebust run -u ${url}`;
  if (packet) packet.requestHeaders.forEach(p => {
    cmd += ` --header "${p}"`;
  });
  console.log(`Command: ${cmd}`);
  await systemStr(cmd);
}

/**
 * @param {ParsedPath[]} paths 
 */
async function brute(paths) {
  const urls = paths.map(p => `${p.origin}${p.path}`);
  console.log('About to brute following urls');
  console.log(urls);
  console.log("=============================");
  for (let i = 0; i < paths.length; ++i) {
    const url = `${paths[i].origin}${paths[i].path}`;
    const { requestPacketId } = paths[i];
    const parsedPacket = await packetQL.setStatus(FuzzStatus.ANY).query({ requestPacketId });
    console.log({ requestPacketId });
    console.log(parsedPacket);
    await runStrangeBust(url, parsedPacket[0]);
    await pathQL.setQueryDone([paths[i]]); // Set done 1 paths[i] only
  }
}

async function main() {
  const paths = await pathQL.query();
  await brute(paths.slice(0, 5));
  process.exit(0);
}

main();