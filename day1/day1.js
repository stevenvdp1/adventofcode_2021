const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');

const windowOfMeasurements = (data) =>{
    let window = []
    for(let i = 0; i < data.length; i++) {
        if(i + 2 < data.length){
            window.push(data.slice(i, i+3).reduce((a,b) => Number(a) + Number(b),0))
        }
    }
    return window
}

const numberOfLargerMeasurements = (array) => {
    let answer = 0;
    for(let i = 0; i < array.length; i++) {
        if(i+1<array.length && (Number(array[i]) < Number(array[i+1]))) answer++
    }
    return answer
}
console.log(`Answer1: ${numberOfLargerMeasurements(data)}`)
console.log(`Answer2: ${numberOfLargerMeasurements(windowOfMeasurements(data))}`)
