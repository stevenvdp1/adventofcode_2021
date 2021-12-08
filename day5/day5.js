console.time('totalTime')

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n').map(line => line.split(' -> ').map(point => point.split(',').map(Number)));

const getDiagramNoDiagonal = (data) => {
    const maxX = Math.max(...data.map(line => Math.max(line[0][0], line[1][0])))
    const maxY = Math.max(...data.map(line => Math.max(line[0][1], line[1][1])))
    let diagram = new Array(maxX + 1).fill(0).map(() => new Array(maxY + 1).fill(0))
    data.forEach(line => {
        let [[x_1, y_1], [x_2, y_2]] = line
        if (x_1 === x_2) {
            const[start, end] = [y_1, y_2].sort((a, b) => a - b)
            for (let i = start; i <= end; i++){
                diagram[x_1][i]++
            }
        }
        else if (y_1 === y_2) {
            const[start, end] = [x_1, x_2].sort((a, b) => a - b)
            for (let i = start; i <= end; i++){
                diagram[i][y_1]++
            }
        }
    })
    return diagram
}

const getDiagram = (data) => {
    const maxX = Math.max(...data.map(line => Math.max(line[0][0], line[1][0])))
    const maxY = Math.max(...data.map(line => Math.max(line[0][1], line[1][1])))
    let diagram = new Array(maxX + 1).fill(0).map(() => new Array(maxY + 1).fill(0))
    data.forEach(line => {
        let [[x_1, y_1], [x_2, y_2]] = line
        if (x_1 === x_2) {
            const[start, end] = [y_1, y_2].sort((a, b) => a - b)
            for (let i = start; i <= end; i++){
                diagram[x_1][i]++
            }
        }
        else if (y_1 === y_2) {
            const[start, end] = [x_1, x_2].sort((a, b) => a - b)
            for (let i = start; i <= end; i++){
                diagram[i][y_1]++
            }
        }
        else{
            const length = Math.abs(x_1 - x_2)+1
            let xDirection = x_1 < x_2 ? 1 : -1
            let yDirection = y_1 < y_2 ? 1 : -1
            for(let i = 0; i < length; i++){
                diagram[x_1 + i * xDirection][y_1 + i * yDirection]++
            }
        }
    })
    return diagram
}

console.log('Answer1:', getDiagramNoDiagonal(data).flat().filter(x => x > 1).length)
console.log('Answer2:', getDiagram(data).flat().filter(x => x > 1).length)
console.timeEnd('totalTime')