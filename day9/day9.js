console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n').map(line => line.split('').map(Number));

const lowPoints = (data) => {
    let points = [];
    for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < data[x].length; y++) {
            if (adjacent(x, y, data).every(a => data[a.x][a.y] > data[x][y])) points.push({ value: data[x][y], x, y })
        }
    }
    return points;
}

const basins = (data) => {
    let basins = []
    let checked = new Array(data.length).fill(0).map(() => new Array(data[0].length).fill(false));
    lowPoints(data).forEach(lp => {
        basins.push(basinSize(lp, data, checked))
    });
    return basins
}

const basinSize = (point, data, checked) => {
    let size = 1;
    checked[point.x][point.y] = true;
    let adjPoints = adjacent(point.x, point.y, data).filter(a => a.value > point.value && a.value !== 9);
    while (adjPoints.length > 0) {
        let next = adjPoints.pop();
        if (!checked[next.x][next.y]) {
            size += basinSize(next, data, checked);
        }
    }
    return size
}

const adjacent = (x, y, data) => {
    let adjacent = [];
    if (x > 0) adjacent.push({ value: data[x - 1][y], x: x - 1, y });
    if (x < data.length - 1) adjacent.push({ value: data[x + 1][y], x: x + 1, y });
    if (y > 0) adjacent.push({ value: data[x][y - 1], x, y: y - 1 });
    if (y < data[x].length - 1) adjacent.push({ value: data[x][y + 1], x, y: y + 1 });
    return adjacent
}

console.log('Answer1:', lowPoints(data).reduce((a, b) => a + 1 + data[b.x][b.y], 0));
console.log('Answer2:', basins(data).sort((a, b) => b - a).slice(0,3).reduce((a, b) => a * b))


console.timeEnd('totalTime')