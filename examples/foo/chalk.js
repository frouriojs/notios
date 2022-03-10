(async () => {
  console.log('starting colorful');
  const chalk = await import('chalk');

  console.log(`${chalk.default.red('red')}`);
})();
