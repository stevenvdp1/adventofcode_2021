console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n').map(line => line.split('').map(Number));

const adjacents = (x, y, data) => {
    let adj = []
    if (x > 0) adj.push({ x: x - 1, y: y })
    if (x < data[y].length - 1) adj.push({ x: x + 1, y: y })
    if (y > 0) adj.push({ x: x, y: y - 1 })
    if (y < data.length - 1) adj.push({ x: x, y: y + 1 })
    if (x > 0 && y > 0) adj.push({ x: x - 1, y: y - 1 })
    if (x < data[y].length - 1 && y > 0) adj.push({ x: x + 1, y: y - 1 })
    if (x > 0 && y < data.length - 1) adj.push({ x: x - 1, y: y + 1 })
    if (x < data[y].length - 1 && y < data.length - 1) adj.push({ x: x + 1, y: y + 1 })
    return adj
}

const step = (data) => {
    let flashes = []
    data = data.map((row, y) => row.map((cell, x) => {
        cell = cell + 1
        if (cell > 9) flashes.push({ x, y, flashed: false })
        return cell
    }))
    while (flashes.some(flash => !flash.flashed)) {
        flashes.forEach(flash => {
            if (!flash.flashed) {
                flash.flashed = true
                adjacents(flash.x, flash.y, data).forEach(adj => {
                    data[adj.y][adj.x] = data[adj.y][adj.x] + 1
                    if (data[adj.y][adj.x] > 9 && !flashes.some(f => f.x === adj.x && f.y === adj.y)) flashes.push({ x: adj.x, y: adj.y, flashed: false })
                })
            }
        })
    }
    flashes.forEach(flash => {
        data[flash.y][flash.x] = 0
    });

    return { data, flashes:flashes.length }
}

const totalFlashes = (data, days) => {
    let flashes = 0
    for (let i = 0; i < days; i++) {
        let res = step(data)
        flashes += res.flashes
        data = res.data
    }
    return flashes
}

findFirstSyncStep = (data) => {
    let stepCount = 0
    while(true){
        stepCount++
        let res = step(data)
        data = res.data
        if(res.flashes === 100) return stepCount
    }
}


console.log('Answer1:',totalFlashes([...data], 100))
console.log('Answer2:', findFirstSyncStep([...data]))

console.timeEnd('totalTime')