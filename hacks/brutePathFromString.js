const {system} = require('@drstrain/drutil');

s = "https://d.line-scdn.net/n/_4/torimochi.js/public/v1/release/stable/min/torimochi.js";
s = "https://line-objects-internal.com/assets/biz-manager/edge/js/xlt-en-domain-sideMenu-json.js";

async function brutePathFromString(s) {
  const u = new URL(s);
  const path = u.pathname;
  const origin = u.origin;

  const parsedPath = path.split('/');
  let curPath = '';
  for (let i = 0; i < parsedPath.length - 1; ++i) {
    curPath += parsedPath[i] + '/';
    await system('strangebust', ['run', '-u', `${origin}${curPath}`]);
  }
  
  process.exit(0);
}

brutePathFromString(s);

async function brutePathFromArray(arr) {
  for (let i = 0; i < arr.length; ++i) {
    const u = arr[i];
    await system('strangebust', ['run', '-u', u]);
  };
  process.exit(0);
}

// brutePathFromArray([
//   // 'https://d.line-scdn.net/n/_4/torimochi.js/public/v1/build/',
//   // 'https://d.line-scdn.net/n/_4/torimochi.js/public/build/',
//   // 'https://d.line-scdn.net/n/_4/torimochi.js/public/',
//   // 'https://d.line-scdn.net/n/_4/torimochi.js/js/',
//   // 'https://d.line-scdn.net/n/member/',
//   // 'https://d.line-scdn.net/n/main/',
//   // 'https://d.line-scdn.net/n/account/',
//   // 'https://d.line-scdn.net/n/common/',

//   //
//   'https://d.line-scdn.net/n/member/js/',
//   'https://d.line-scdn.net/n/account/js/',
//   'http://static.naver.jp/matome_sp/js/',
//   'http://static.naver.jp/matome/js/',
// ]);