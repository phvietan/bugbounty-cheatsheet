const {packetQL,reader} = require('./libs/init');

async function main() {
  const packets = await packetQL.query();

  for (let i = 0; i < Math.min(packets.length, 5); ++i) {
    const p = packets[i];
    const burp = await reader.parseRequestToBurp(p);
    console.log(burp);
    console.log("================================");
  };
  process.exit(0);
}
main();
