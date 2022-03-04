const ms = process.argv[2];
// eslint-disable-next-line no-console
console.log('Starting...');
// eslint-disable-next-line no-console
console.log(`Will be done in ${ms}ms`);
setTimeout(() => {
  // eslint-disable-next-line no-console
  console.log(`Done after ${ms}ms`);
}, Number.parseInt(ms, 10));
