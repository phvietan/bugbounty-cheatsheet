const {PathQL, ParsedPath} = require('@drstrain/shadeless-lib');
const fs = require('fs/promises');
const {exec,getRandomString} = require('@drstrain/drutil');
const creds = require('./creds.json');

var spawn = require('child_process').spawn;

const pql = new PathQL({
  choosingProject: 'test',
  ...creds,
});

async function runStrangeBust(url) {
  return new Promise((resolve, reject) => {
    const bruter = spawn('strangebust', ['run', '-u', url]);

    bruter.stdout.on('data', function (data) {
      console.log(data.toString().trim());
    });
    bruter.stderr.on('data', function (data) {
      console.log(data.toString().trim());
    });
    bruter.on('exit', function (code) {
      console.log('child process exited');
      console.log("=============================");
      resolve();
    });
  });
}

/**
 * 
 * @param {ParsedPath[]} paths 
 */
async function brute(paths) {
  const urls = paths.map(p => `${p.origin}${p.path}`);
  console.log('About to brute following urls');
  console.log(urls);
  console.log("=============================");
  for (let i = 0; i < urls.length; ++i) {
    const url = urls[i];
    await runStrangeBust(url);
    await pql.setQueryDone([paths[i]]); // Set done 1 paths[i] only
  }
}

async function main() {
  const paths = await pql.query();
  await brute(paths.slice(0, 5));
  process.exit(0);
}

main();