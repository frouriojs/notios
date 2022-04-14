console.log(new Date(), 'starting...');
let i = 0;
const ms = Number.parseInt(process.argv[2], 10);
const c = Number.parseInt(process.argv[3], 10);
setInterval(() => {
  for (let j = 0; j < c; j++) {
    console.log(i++);
  }
}, ms);
