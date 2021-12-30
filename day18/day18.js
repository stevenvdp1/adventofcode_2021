console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n').map(line => line.split(''))


const reduceNumber = (number) => {
    while (true) {
        let explodedNumber = explodeNumber([...number])
        if (explodedNumber.join('') === number.join('')) break;
        number = explodedNumber
    }
    let splitNum = splitNumber([...number])
    if (splitNum.join('') === number.join('')) return splitNum
    return reduceNumber([...splitNum])
}

const explodeNumber = (number) => {
    let depth = 0
    let i = 0
    let lastNumberIndex
    while (i < number.length) {
        char = number[i]
        if (char === '[') depth++
        else if (char === ']') depth--
        else if (!Number.isNaN(+char) && depth > 4 && !Number.isNaN(+number[i + 2])) {
            let left = Number(number[i])
            let right = Number(number[i + 2])
            if (lastNumberIndex) number[lastNumberIndex] = Number(number[lastNumberIndex]) + left
            let nextNumberIndex = number.slice(i + 4).findIndex(c => !Number.isNaN(+c)) + i + 4
            if (nextNumberIndex > i + 4) number[nextNumberIndex] = Number(number[nextNumberIndex]) + right
            number.splice(i - 1, 5, 0)
            break;
        }
        else if (!Number.isNaN(+char)) lastNumberIndex = i
        i++
    }
    return number
}

const splitNumber = (number) => {
    let index = number.findIndex(c => !Number.isNaN(+c) && +c > 9)
    if (index > 0) number.splice(index, 1, '[', Math.floor(Number(number[index]) / 2), ',', Math.ceil(Number(number[index]) / 2), ']')
    return number
}

const getMagnitude = (number) => {
    while (true) {
        let i = number.findIndex((c, index) => c === '[' && index + 4 <= number.length && number[index + 4] === ']')
        if (i >= 0) {
            let left = number[i + 1]
            let right = number[i + 3]
            let magnitude = (left * 3) + (right * 2)
            number.splice(i, 5, magnitude)
        }
        else return number
    }
}

const addAll = (data) => {
    let number = data.shift()
    while (data.length > 0) {
        number = ('[' + number.join('') + ',' + data.shift().join('') + ']').split('')
        let reducedNumber = reduceNumber([...number])
        number = reducedNumber
    }
    return number
}

const findLargestMagnitude = (data) => {
    let largestMag = 0
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            let magnitude = getMagnitude(addAll([data[i], data[j]]))[0]
            let magnitude2 = getMagnitude(addAll([data[j], data[i]]))[0]
            largestMag = Math.max(largestMag, magnitude, magnitude2)
        }
    }
    return largestMag
}

console.log('Answer1:', getMagnitude(addAll([...data]))[0])
console.log('Answer2:', findLargestMagnitude([...data]))
console.timeEnd('totalTime')
