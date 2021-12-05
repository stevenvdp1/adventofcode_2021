const time = new Date()

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n');


const answer1 = (data) => {
    let x = 0
    let y = 0
    for (let line of data) {
        const [direction, distance] = line.split(' ')
        if (direction === 'forward') x += parseInt(distance)
        else if (direction === 'up') y -= parseInt(distance)
        else if (direction === 'down') y += parseInt(distance)
    }
    return x * y
}


const answer2 = (data) => {
    let aim = 0
    let x = 0
    let y = 0

    for (let line of data) {
        const [direction, distance] = line.split(' ')
        if (direction === 'forward') {
            x += parseInt(distance)
            y += (parseInt(distance) * aim)
        }
        else if (direction === 'up') aim -= parseInt(distance)
        else if (direction === 'down') aim += parseInt(distance)
    }
    return x*y
}

console.log(answer1(data))
console.log(answer2(data))
console.log('Time (ms):', new Date() - time)