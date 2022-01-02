console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n').map(line => line.split(''))

const doStep = (board) => {
    let moved = false
    let newBoard = new Array(board.length).fill('.').map(() => new Array(board[0].length).fill('.'))
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            let char = board[y][x]
            let nextChar = board[y][(x + 1) % board[y].length]
            if (char === '>' && nextChar === '.') {
                newBoard[y][(x + 1) % board[y].length] = '>'
                moved = true
            }
            else if (newBoard[y][x] === '.') {
                newBoard[y][x] = char
            }
        }
    }
    board = newBoard
    newBoard = new Array(board.length).fill('.').map(() => new Array(board[0].length).fill('.'))
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            let char = board[y][x]
            let nextChar = board[(y + 1) % board.length][x]
            if (char === 'v' && nextChar === '.') {
                newBoard[(y + 1) % board.length][x] = 'v'
                moved = true
            }
            else if (newBoard[y][x] === '.') {
                newBoard[y][x] = char
            }
        }
    }
    return { board: newBoard, moved }
}

doStep(data)
let board = data
let count = 0
while (true) {
    let result = doStep(board)
    count++
    if (!result.moved) break
    board = result.board
}
console.log('Answer1:', count)
console.timeEnd('totalTime')
