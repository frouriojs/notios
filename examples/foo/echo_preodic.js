console.log(new Date(), 'starting...');
setInterval(() => {
  console.log(new Date(), process.argv);
}, 2000);
