console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n').map(line => line.split('').map(Number));

const getLowestRisk = (grid) => {
    let start = '0-0'
    let end = `${grid.length - 1}-${grid[0].length - 1}`

    let risks = new Map()
    risks.set(start, 0)
    risks.set(end, Number.MAX_SAFE_INTEGER)

    let visited = new Set()

    let priorityQueue = new PriorityQueue()
    priorityQueue.enqueue({ node: start, value: 0 })

    while (!priorityQueue.isEmpty()) {
        let node = priorityQueue.dequeue()
        let neighbours = getNeighbours(grid, node.node)
        for (let neighbour of neighbours) {
            if (!visited.has(neighbour)) {
                let [x, y] = neighbour.split('-').map(Number)
                let newDistance = node.value + grid[x][y]
                if (!risks.get(neighbour) || newDistance < risks.get(neighbour)) {
                    risks.set(neighbour, newDistance)
                    priorityQueue.enqueue({ node: neighbour, value: newDistance })
                }
            }
        }
    }
    return risks.get(end)
}

const getNeighbours = (grid, node) => {
    let [x, y] = node.split('-').map(Number)
    let neighbours = []
    if (x > 0) neighbours.push(`${x - 1}-${y}`)
    if (y > 0) neighbours.push(`${x}-${y - 1}`)
    if (x < grid.length - 1) neighbours.push(`${x + 1}-${y}`)
    if (y < grid[0].length - 1) neighbours.push(`${x}-${y + 1}`)
    return neighbours
}

const bigGrid = (grid) => {
    let newGrid = new Array((grid.length) * 5).fill(0).map(() => new Array((grid[0].length) * 5).fill(0))
    for (let x = 0; x < newGrid.length; x++) {
        for (let y = 0; y < newGrid[0].length; y++) {
            value = grid[x % grid.length][y % grid[0].length] + (Math.floor(x / grid.length)) + (Math.floor(y / grid.length))
            newGrid[x][y] = value % 10 + Math.floor(value / 10) * 1
        }
    }
    return newGrid
}

class PriorityQueue {
    constructor() {
        this.items = []
    }
    enqueue(element) {
        this.items.push(element)
        this.items.sort((a, b) => a.value - b.value)
    }
    dequeue() {
        return this.items.shift()
    }
    isEmpty() {
        return this.items.length === 0
    }
}


console.log('Answer1:', getLowestRisk(data))
console.log('Answer2:', getLowestRisk(bigGrid(data)))
console.timeEnd('totalTime')
