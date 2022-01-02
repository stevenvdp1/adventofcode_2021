const _ = require('lodash')

const moveCost = {
    A: 1,
    B: 10,
    C: 100,
    D: 1000
}
const roomIndex = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}
let rooms1 = {
    A: ['B', 'D', 'D', 'C'],
    B: ['B', 'C', 'B', 'A'],
    C: ['D', 'B', 'A', 'D'],
    D: ['A', 'A', 'C', 'C']
}
let rooms2 = {
    A: ['B', 'C'],
    B: ['B', 'A'],
    C: ['D', 'D'],
    D: ['A', 'C']
}

let hallway = new Array(11).fill('.')
hallway[2] = '-'
hallway[4] = '-'
hallway[6] = '-'
hallway[8] = '-'

class PriorityQueue {
    constructor() {
        this.items = []
    }
    enqueue(element) {
        this.items.push(element)
        this.items.sort((a, b) => a.cost - b.cost)
    }
    dequeue() {
        return this.items.shift()
    }
    isEmpty() {
        return this.items.length === 0
    }
    size() {
        return this.items.length
    }
}

const isDone = (grid) => {
    return Object.entries(grid.rooms).every(([key, pods]) => {
        return pods.every(pod => pod === key)
    })
}
const canMoveToRoom = (pod, room) => {
    return !room.some(s => s !== pod && s !== '.')
}
const isPathClear = (grid, from, to) => {
    let direction = Math.sign(to - from)
    let offset = direction > 0 ? 1 : 0
    let left = Math.min(from, to) + offset
    let right = Math.max(from, to) + offset
    return grid.hallway.slice(left, right).every(s => s === '.' || s === '-')
}
const destionationIndex = (room) => {
    let destination = -1
    for (let [index, s] of room.entries()) {
        if (s === '.') destination = index
    }
    return destination
}
const canMoveFromRoom = (key, room) => {
    return room.some(s => s !== key && s !== '.')
}
const test = (grid) => {
    let counter = { A: 0, B: 0, C: 0, D: 0, '.': 0, '-': 0 }

    for (let s of grid.hallway) {
        counter[s]++
    }
    for (let room of Object.values(grid.rooms)) {
        for (let s of room) {
            counter[s]++
        }
    }
    console.assert(counter.A === 2)
    console.assert(counter.B === 2)
    console.assert(counter.C === 2)
    console.assert(counter.D === 2)
    console.assert(counter['-'] === 4)
    console.assert(counter['.'] === 7)
    console.assert(grid.hallway[2] === '-')
    console.assert(grid.hallway[4] === '-')
    console.assert(grid.hallway[6] === '-')
    console.assert(grid.hallway[8] === '-')
}

const solve = (grid) => {
    const queue = new PriorityQueue()
    queue.enqueue({ grid: _.cloneDeep(grid), cost: 0 })
    const visited = new Map()
    visited.set(JSON.stringify(grid), 0)

    while (!queue.isEmpty()) {
        let { grid, cost } = queue.dequeue()
        if (isDone(grid)) {
            return cost
        }
        if (visited.get(JSON.stringify(grid)) < cost) {
            continue
        }
        //moveToRoom
        let newGrid = _.cloneDeep(grid)
        let newCost = cost
        for (let [index, pod] of grid.hallway.entries()) {
            if (grid.rooms[pod] && canMoveToRoom(pod, grid.rooms[pod]) && isPathClear(grid, index, roomIndex[pod])) {
                newGrid.hallway[index] = '.'
                let destinationRoomIndex = destionationIndex(grid.rooms[pod])
                newGrid.rooms[pod][destinationRoomIndex] = pod
                let distance = destinationRoomIndex + 1 + Math.abs(roomIndex[pod] - index)
                newCost += (distance * moveCost[pod])
            }
        }
        queue.enqueue({ grid: newGrid, cost: newCost })
        for (let [key, room] of Object.entries(grid.rooms)) {
            if (!canMoveFromRoom(key, room)) continue
            let topPodIndex = room.findIndex(s => s !== '.')
            let pod = room[topPodIndex]
            for (let i = 0; i <= 10; i++) {
                if (Object.values(roomIndex).includes(i)) continue
                if (grid.hallway[i] !== '.') continue
                if (!isPathClear(grid, roomIndex[key], i)) continue

                let distance = topPodIndex + 1 + Math.abs(roomIndex[key] - i)
                let newCost = cost + (distance * moveCost[pod])
                let newGrid = _.cloneDeep(grid)
                newGrid.hallway[i] = pod
                newGrid.rooms[key][topPodIndex] = '.'
                if (visited.has(JSON.stringify(newGrid)) && visited.get(JSON.stringify(newGrid)) < newCost) continue
                queue.enqueue({ grid: newGrid, cost: newCost })
                visited.set(JSON.stringify(newGrid), newCost)
            }
        }
    }
}
console.log(solve({ rooms: rooms2, hallway }))








