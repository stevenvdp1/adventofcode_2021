console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n');


const pairs = ['{}', '<>', '[]', '()']
const closingTags = ['}', '>', ']', ')']

const getIllegalChars = (data) => {
    let illegalChars = [];
    data.forEach(line => {
        while (pairs.some(p => line.includes(p))) {
            pairs.forEach(p => line = line.replace(p, ''))
        }
        illegalChars.push(line.split('').find(c => closingTags.includes(c)))
    })
    return illegalChars.filter(c=>c!==undefined)
}

const getScore = (chars) => {
    let sum = 0
    sum += chars.filter(c => c === ')').length * 3
    sum += chars.filter(c => c === ']').length * 57
    sum += chars.filter(c => c === '}').length * 1197
    sum += chars.filter(c => c === '>').length * 25137
    return sum
}

const incompleteLinesScore = (data)=>{
    return data.map(line=>{
        while (pairs.some(p => line.includes(p))) {
            pairs.forEach(p => line = line.replace(p, ''))
        }
        line = line.split('')
        if(!line.some(c=>closingTags.includes(c))){
            let sum =0
            while(line.length>0){
                let char = line.pop()
                sum = sum*5
                if(char==='(')sum+=1
                else if(char==='[')sum+=2
                else if(char==='{')sum+=3
                else if(char==='<')sum+=4
            }
            return sum
        }
    }).filter(line=>line!==undefined)
}

const middleScore = (scores) => scores.sort((a,b)=>a-b)[Math.floor(scores.length/2)]

console.log('Answer1:', getScore(getIllegalChars(data)))
console.log('Answer2:', middleScore(incompleteLinesScore(data)))
console.timeEnd('totalTime')