const n = Number.parseInt(process.argv[2], 10);

Array(n)
  .fill(0)
  .forEach((_, i) => {
    console.log(i);
  });
