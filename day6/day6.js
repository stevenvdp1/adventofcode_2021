console.time('totalTime')

const fs = require('fs');
const path = require('path');

let populationByAge = Array(9).fill(0);
fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split(',').map(Number).forEach(fish => populationByAge[fish]++);

const fishesAfterNDays = (populationByAge, days) => {
    for (let i = 0; i < days; i++) {
       let newFishes = populationByAge.shift();
       populationByAge[6] += newFishes;
       populationByAge.push(newFishes);
    }
    return populationByAge.reduce((a, b) => a + b);
}

console.log('Answer1:', fishesAfterNDays([...populationByAge], 80))
console.log('Answer2:', fishesAfterNDays([...populationByAge], 256))
console.timeEnd('totalTime')