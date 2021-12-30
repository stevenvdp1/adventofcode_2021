console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').replace('target area: ', '').split(', ')

let xBounderies = data[0].split('=')[1].split('..').map(Number)
let yBounderies = data[1].split('=')[1].split('..').map(Number)

const canYHit = (yVel) => {
    let y = 0
    let step = 0
    while (y >= yBounderies[1]) {
        yVel--
        y += yVel
        if (y >= yBounderies[0] && y <= yBounderies[1]) return true
        step++
    }
    return false
}

const findHighestY = () => {
    let yVelMax = 0
    for (let yVel = yBounderies[0]; yVel <= yBounderies[1]; yVel++) {
        if (canYHit(yVel)) {
            yVelMax = Math.abs(yVel)
            break;
        }
    }
    yMax = yVelMax * (1 + yVelMax) / 2
    return yMax
}

const findAllHits = () => {
    let hits = []
    let maxXVel = xBounderies[1]
    let maxYVel = Math.abs(yBounderies[0])
    for (let xVel = 0; xVel <= maxXVel; xVel++) {
        for (let yVel = -maxYVel; yVel <= maxYVel; yVel++) {
            if (canHit(xVel, yVel)) {
                hits.push({ x: xVel, y: yVel })
            }
        }
    }

    return hits
}

const canHit = (xVel, yVel) => {
    let x = 0
    let y = 0
    while (x <= xBounderies[1] && y >= yBounderies[0]) {
        x += xVel
        xVel = Math.max(xVel - 1, 0)
        y += yVel
        yVel = yVel - 1
        if (x >= xBounderies[0] && x <= xBounderies[1] && y <= yBounderies[1] && y >= yBounderies[0]) {
            return true
        }
    }
    return false
}

console.log('Answer1:', findHighestY())
console.log('Answer2:', findAllHits().length)
console.timeEnd('totalTime')