console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n\r\n');
const coordinates = data[0].split('\r\n').map(row => row.split(','));
const folds = data[1].split('\r\n').map(row => row.replace('fold along ', '').split('='));


const getGrid = (folds, coordinates) => {
    const height = folds.find(fold => fold[0] === 'x')[1]*2
    const width = folds.find(fold => fold[0] === 'y')[1]*2
    const grid = new Array(width + 1).fill(0).map(() => new Array(height + 1).fill(false));

    coordinates.forEach(coordinate => {
        grid[coordinate[1]][coordinate[0]] = true;
    })
    return grid
}

const doFold = (grid, fold) => {
    let newGrid
    if (fold[0] === 'x') {
        newGrid = Array(grid.length).fill(0).map(() => new Array((grid[0].length - 1) / 2).fill(false));
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < (grid[0].length - 1) / 2; x++) {
                newGrid[y][x] = Boolean(grid[y][x] + grid[y][grid[0].length - 1 - x]);
            }
        }
    }
    if (fold[0] === 'y') {
        newGrid = Array((grid.length - 1) / 2).fill(0).map(() => new Array(grid[0].length).fill(false));
        for (let y = 0; y < (grid.length - 1) / 2; y++) {
            for (let x = 0; x < grid[0].length; x++) {
                newGrid[y][x] = Boolean(grid[y][x] + grid[grid.length - 1 - y][x]);
            }
        }
    }
    return newGrid
}

const doAllFolds = (grid, folds) => {
    folds.forEach((fold,index) => {
        grid = doFold(grid, fold)
    })

    return grid.map(row => {
        return row.map(cell => { 
            if (cell) return'#'
            return '.'
        })
    })
}

console.log('Answer1:', doFold(getGrid([...folds], [...coordinates]), folds[0]).flat().filter(Boolean).length)
console.table(doAllFolds(getGrid(folds, coordinates), folds))

console.timeEnd('totalTime')