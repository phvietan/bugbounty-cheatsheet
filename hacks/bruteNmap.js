const { ParsedPacket } = require('@drstrain/shadeless-lib');
const { system, dnsResolve } = require('@drstrain/drutil');
const { packetQL, toolNoteQL } = require('./libs/init');

toolNoteQL.setTool('nmap');

/**
 * @param {ParsedPacket} packet
*/
async function isPacketAlreadyNmap(packet) {
  const { hostname } = new URL(packet.origin);
  const ip = await dnsResolve(hostname);
  const toolNotes = await toolNoteQL.query({ key: packet. });
  return toolNotes.length > 0;
}

async function main() {
  const packets = await packetQL.query();

  const numPacketsHack = 5;
  const targetsLog = [];
  const hackPackets = [];
  for (let i = 0; i < packets.length && hackPackets.length < numPacketsHack; ++i) {
    const cur = packets[i];
    const check = await isPacketAlreadyArjun(cur);
    if (check) continue;
    hackPackets.push(cur);
    targetsLog.push(getKeyToolNote(cur))
  }

  console.log('About to run arjun on following endpoints');
  console.log(targetsLog);

  for (let i = 0; i < hackPackets.length; ++i) {
    const cur = hackPackets[i];
    await runArjun(cur);
    // await toolNoteQL.setQueryDone({
    //   key: getKeyToolNote(cur),
    // });
    console.log("===============================================");
  }
  process.exit(0);
}
main();
