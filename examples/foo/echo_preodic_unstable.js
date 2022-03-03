// eslint-disable-next-line no-console
console.log(new Date(), 'starting...');
setInterval(() => {
  // eslint-disable-next-line no-console
  console.log(new Date(), process.argv);
  if (Math.random() < 1 / 8) {
    throw new Error('something failed');
  }
}, 2000);
