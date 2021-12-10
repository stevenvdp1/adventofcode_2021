console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n').map(line => line.split(''));

const pairs = ['{}', '<>', '[]', '()']
const closingTags = { '}': 1197, '>': 25137, ']': 57, ')': 3 }
const openingTags = { '{': 3, '<': 4, '[': 2, '(': 1 }

let corruptedScore = 0;
let incompleteScores = []

data.forEach(line => {
    let stack = []
    while (line.length > 0) {
        let char = line.shift()
        if (Object.keys(openingTags).includes(char)) stack.push(char)
        else if (pairs.includes(stack[stack.length - 1] + char)) stack.pop()
        else {
            corruptedScore += closingTags[char]
            break;
        }
        if (line.length === 0){
            let score = 0
            while(stack.length > 0){
                let char = stack.pop()
                score = score * 5
                score += openingTags[char]
            }
            incompleteScores.push(score)
        }
    }
})

console.log('Answer1:', corruptedScore)
console.log('Answer2:', incompleteScores.sort((a, b) => a - b)[Math.floor(incompleteScores.length / 2)])

console.timeEnd('totalTime')