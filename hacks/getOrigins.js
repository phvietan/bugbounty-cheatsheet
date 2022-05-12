const { packetQL } = require('./libs/init');

async function main() {
  const packets = await packetQL.setThreshold(100).query();
  const hostnames = packets.map(p => {
    const u = new URL(p.origin);
    return u.hostname;
  });
  const unique = [...new Set(hostnames)];
  const s = unique.reduce((prev, cur) => prev+cur+'\n', '').trimEnd();
  console.log(s);
  process.exit(0);
}
main();
