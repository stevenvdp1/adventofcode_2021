console.time('Ran all days in');
for (let i = 1; i < 15; i++) {
    require('child_process').execSync(`node ./day${i}/day${i}.js`)
    console.log(`Day${i}: completed`);
};
console.timeEnd('Ran all days in');
