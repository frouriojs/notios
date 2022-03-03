// eslint-disable-next-line no-console
console.log(new Date(), 'starting...');
setInterval(() => {
  // eslint-disable-next-line no-console
  console.log(new Date(), process.argv);
}, 2000);
