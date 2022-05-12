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
brutePathFromString(s);

async function brutePathFromArray(arr) {
  for (let i = 0; i < arr.length; ++i) {
    const u = arr[i];
    await system('strangebust', ['run', '-u', u]);
  };
  process.exit(0);
}

brutePathFromArray([
  // 'https://www.lifebox.vn/about/',
  // 'https://www.lifebox.vn/',
  // 'https://www.lifebox.vn/ui/jsp/',
  // 'https://www.lifebox.vn/ui/',
  // 'https://www.lifebox.vn/ui/app/',
  // 'https://www.lifebox.vn/ui/app/static/',
  // 'https://www.lifebox.vn/ui/app/static/assets/',
  // 'https://www.lifebox.vn/ui/app/static/assets/brand/',
  // 'https://www.lifebox.vn/ui/html/',
]);
