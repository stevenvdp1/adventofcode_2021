const time = new Date()

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n').map(Number);

const windowOfMeasurements = (data) => {
    let window = []
    for (let i = 0; i < data.length; i++) {
        if (i + 2 < data.length) window.push(data.slice(i, i + 3).reduce((a, b) => a + b, 0))
    }
    return window
}

const numberOfLargerMeasurements = (array) => {
    let answer = 0;
    for (let i = 0; i < array.length; i++) {
        if (i + 1 < array.length && (array[i] < array[i + 1])) answer++
    }
    return answer
}
console.log(`Answer1: ${numberOfLargerMeasurements(data)}`)
console.log(`Answer2: ${numberOfLargerMeasurements(windowOfMeasurements(data))}`)
console.log('Time (ms):', new Date() - time)