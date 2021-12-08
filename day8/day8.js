console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n');


const countEasyValuesInOutput = (data) => {
    const count = data.reduce((acc, curr) => {
        const [input, output] = curr.split(' | ').map(x => x.split(' '))
        acc = acc + output.filter(x => [2, 3, 4, 7].includes(x.length)).length
        return acc
    }, 0)
    return count
}

const getSumOfOutput = (data) => {
    const sum = data.reduce((acc, curr) => {
        const all = curr.replace(' | ', ' ').split(' ').map(x => x.split('').sort().join(''))
        const output = curr.split(' | ')[1].split(' ').map(x => x.split('').sort().join(''))
        let digits = []
        digits[1] = all.find(x => x.length === 2)
        digits[4] = all.find(x => x.length === 4)
        digits[7] = all.find(x => x.length === 3)
        digits[8] = all.find(x => x.length === 7)
        digits[9] = all.find(x => x.length === 6 && digits[4].split('').every(d => x.split('').includes(d)))
        digits[0] = all.find(x => x.length === 6 && x !== digits[9] && digits[1].split('').every(d => x.split('').includes(d)))
        digits[6] = all.find(x => x.length === 6 && x !== digits[0] && x !== digits[9])
        digits[3] = all.find(x => x.length === 5 && digits[1].split('').every(d => x.split('').includes(d)))
        digits[5] = all.find(x => x.length === 5 && x.split('').every(d => digits[6].split('').includes(d)))
        digits[2] = all.find(x => x.length === 5 && x !== digits[3] && x !== digits[5])
        let result = output.map(x=>digits.indexOf(x)).join('')
        acc += +result
        return acc
    }, 0);
    return sum
}


console.log('Answer1:', countEasyValuesInOutput(data))
console.log('Answer2:', getSumOfOutput(data))
console.timeEnd('totalTime')
