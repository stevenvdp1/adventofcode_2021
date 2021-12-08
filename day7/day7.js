const time = new Date()

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split(',').map(Number);

const medianValue = (data) => {
    data = data.sort((a, b) => a - b);
    return data[(data.length / 2) - 1]
}

const usedFuel = data => {
    let pos = medianValue(data)
    let fuel = data.reduce((acc, curr) => acc + Math.abs(curr - pos), 0)
    return fuel
}

const averageValue = (data) => {
    let sum = data.reduce((acc, curr) => acc + curr, 0)
    return Math.floor(sum / data.length)
}

const usedFuel2 = (data) =>{
    let pos = averageValue(data)
    let fuel = data.reduce((acc, curr) => acc + sumRange(Math.abs(curr - pos)), 0)
    return fuel
}

const sumRange = (number) =>{
    return number * (number + 1) / 2
}
console.log(usedFuel([...data]))
console.log(usedFuel2([...data]))
console.log('Time (ms):', new Date() - time)