const { PathQL, PacketQL, ToolNoteQL } = require('@drstrain/shadeless-lib');

const opts = {
  choosingProject: 'duckduckgo',
  ...require('./creds.json'),
}

const pathQL = new PathQL(opts);
const packetQL = new PacketQL(opts);
const toolNoteQL = new ToolNoteQL(opts);

module.exports = {
  pathQL,
  packetQL,
  toolNoteQL,
}
