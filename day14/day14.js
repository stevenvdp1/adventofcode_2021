console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n\r\n');
const polymer = data[0]
const rules = new Map(data[1].split('\r\n').map(row => row.replace(' -> ', ' ').split(' ')))
const pairs = new Map()

for (let i = 0; i < polymer.length - 1; i++) {
    let pair = polymer[i] + polymer[i + 1]
    if (!pairs.has(pair)) pairs.set(pair, { val: 0 })
    pairs.get(pair).val++
}

const doStep = (pairs) => {
    let updatedPairs = new Map()
    pairs.forEach((val, key) => {
        if (rules.has(key)) {
            let rule = rules.get(key)
            let pair1 = key[0] + rule
            let pair2 = rule + key[1]

            if (!updatedPairs.has(pair1)) updatedPairs.set(pair1, { val: 0 })
            updatedPairs.get(pair1).val += val.val

            if (!updatedPairs.has(pair2)) updatedPairs.set(pair2, { val: 0 })
            updatedPairs.get(pair2).val += val.val
        }
    })
    return updatedPairs
}

const doMultipleSteps = (pairs, stepCount) => {
    let updatedPairs = pairs
    for (let i = 0; i < stepCount; i++) {
        updatedPairs = doStep(updatedPairs)
    }
    return updatedPairs
}

const getMaxSubMin = (pairs) => {
    let occurences = new Map(Array.from(new Set(rules.values())).map(v => [v, { val: 0 }]))
    pairs.forEach((val, key) => {
        occurences.get(key[0]).val += val.val
        occurences.get(key[1]).val += val.val
    })
    let values = Array.from(occurences.values()).map(v => Math.ceil(v.val / 2))
    let min = Math.min(...values)
    let max = Math.max(...values)
    return max - min
}

console.log('Answer1:', getMaxSubMin(doMultipleSteps(new Map(pairs), 10)))
console.log('Answer2:', getMaxSubMin(doMultipleSteps(new Map(pairs), 40)))
console.timeEnd('totalTime')