const {system} = require('@drstrain/drutil');

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

var s = "https://safevuln.com/user/khoiasd/profile";
s = "https://lanimg-beta.line-apps.com/lan/tempimage/TelemedicineCMS_LHC/notice/ja/1799dc47a91_3b05b530c2eec62dc3524de2cafca7e2.jpeg";
brutePathFromString(s);

async function brutePathFromArray(arr) {
  for (let i = 0; i < arr.length; ++i) {
    const u = arr[i];
    await system('strangebust', ['run', '-u', u]);
  };
  process.exit(0);
}

brutePathFromArray([
  'https://lanimg-beta.line-apps.com/lan/tempimage/static',
  'https://lanimg-beta.line-apps.com/lan/tempimage/test/',
]);
