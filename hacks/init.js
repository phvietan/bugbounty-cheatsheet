const { PathQL, PacketQL } = require('@drstrain/shadeless-lib');

const creds = require('./creds.json');

const pathQL = new PathQL({
  choosingProject: 'test',
  ...creds,
});

const packetQL = new PacketQL({
  choosingProject: 'test',
  ...creds,
})

module.exports = {
    pathQL,
    packetQL,
}