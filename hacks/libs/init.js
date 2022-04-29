const { PathQL, PacketQL, ToolNoteQL, PacketReader } = require('@drstrain/shadeless-lib');

const opts = {
  choosingProject: 'test',
  ...require('./creds.json'),
}

const pathQL = new PathQL(opts);
const packetQL = new PacketQL(opts);
const reader = new PacketReader(opts);
const toolNoteQL = new ToolNoteQL(opts);

module.exports = {
  reader,
  pathQL,
  packetQL,
  toolNoteQL,
}
