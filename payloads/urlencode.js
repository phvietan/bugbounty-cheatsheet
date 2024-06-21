const text = require('fs').readFileSync('file.txt', 'ascii');
const arr = text.split('\n')
const arr2 = []
arr.forEach(v => {
  arr2.push(encodeURIComponent(v))
  arr2.push(v)
})
const uniq = [...new Set(arr2)];

const res = uniq.reduce((prev, v) => {
  return prev + '\n' + v;
}, '')

console.log(res.trim())