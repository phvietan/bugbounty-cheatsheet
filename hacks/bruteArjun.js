const { ParsedPacket } = require('@drstrain/shadeless-lib');
const { system } = require('@drstrain/drutil');
const { packetQL, toolNoteQL } = require('./libs/init');

toolNoteQL.setTool('arjun');

const shadelessUrl = 'http://app.drstra.in/timeTravel?range=5&requestPacketId=';

function getKeyToolNote(packet) {
  const key = `${packet.method}:${packet.origin}:${packet.path}`;
  return key;
}

/**
 * @param {ParsedPacket} packet
*/
async function isPacketAlreadyArjun(packet) {
  const toolNotes = await toolNoteQL.query({ key: getKeyToolNote(packet) });
  return toolNotes.length > 0;
}

function getArjunMethod(packet) {
  if (packet.method === 'GET') return 'GET';
  if (packet.method !== 'POST') return 'POST';
  if (packet.requestContentType.includes('application/x-www-form-urlencoded')) return 'POST';
  if (packet.requestContentType.includes('application/json')) return 'JSON';
  if (packet.requestContentType.includes('xml')) return 'XML';
  return 'GET';
}

async function runArjun(packet) {
  if (packet.path.includes('/support-forums-api/avatar/')) {
    console.log('fuck ' + getKeyToolNote(packet));
    return;
  }
  const headers = packet.requestHeaders.reduce((prev, now) => {
    if (now.toLowerCase().includes('content-length')) return prev;
    return prev + now + '\n';
  }, '');
  const url = `${packet.origin}${packet.path}`;
  const args = ['-u', url, '-m', getArjunMethod(packet)];

  if (headers !== '') {
    args.push('--headers');
    args.push(headers);
  }

  console.log('Runing arjun for:', getKeyToolNote(packet));
  await system('arjun', args);
  console.log(`Here: ${shadelessUrl}${packet.requestPacketId}`);
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
