const ms = process.argv[2];
console.log(`Starting...`);
console.log(`Will be done in ${ms}ms`);
setTimeout(() => {
  console.log(`Done after ${ms}ms`);
}, Number.parseInt(ms, 10));
