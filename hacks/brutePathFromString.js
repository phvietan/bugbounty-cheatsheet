const {system} = require('@drstrain/drutil');

// s = "https://static.navercorp.com/static/site/nss/img/spr.png";
// s = "https://line-objects-internal.com/assets/biz-manager/edge/js/xlt-en-domain-sideMenu-json.js";

const headers = [

]

async function brutePathFromString(s) {
  const u = new URL(s);
  const path = u.pathname;
  const origin = u.origin;

  const parsedPath = path.split('/');
  let curPath = '';
  for (let i = 0; i < parsedPath.length - 1; ++i) {
    curPath += parsedPath[i] + '/';
    await system('strangebust', ['run', '-u', `${origin}${curPath}`, '--header', headers[0]]);
  }

  process.exit(0);
}

s = "https://vos.line-scdn.net/spot-gcp-assets/spot-gcp-ui.min.js";
brutePathFromString(s);

async function brutePathFromArray(arr) {
  for (let i = 0; i < arr.length; ++i) {
    const u = arr[i];
    await system('strangebust', ['run', '-u', u]);
  };
  process.exit(0);
}

// brutePathFromArray([
//   'https://music-tw.line-beta.me/api/application/',
//   'https://music-tw.line-beta.me/api/application/cache/',
//   'https://music-tw.line-beta.me/api/application/logs/',
//   'https://music-tw.line-beta.me/api/system/',
// ]);
