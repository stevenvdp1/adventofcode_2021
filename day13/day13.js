console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n\r\n');
const coordinates = data[0].split('\r\n').map(row => row.split(',').map(coordinate => parseInt(coordinate)));
const folds = data[1].split('\r\n').map(row => row.replace('fold along ', '').split('='));

const printTable = (coordinates) => {
    const x_max = Math.max(...coordinates.map(coordinate => coordinate[0]));
    const y_max = Math.max(...coordinates.map(coordinate => coordinate[1]));
    for (let y = 0; y <= y_max; y++) {
        for (let x = 0; x <= x_max; x++) {
            if (coordinates.find(coordinate => coordinate[0] === x && coordinate[1] === y)) {
                process.stdout.write('█');
            } else {
                process.stdout.write(' ');
            }
        }
        process.stdout.write('\n');
    }
    process.stdout.write('\n');
}

const removeDuplicates = (coordinates) => {
    return coordinates.reduce((acc, curr) => {
        if (acc.some(a => a[0] === curr[0] && a[1] === curr[1])) return acc
        return [...acc, curr]
    }, [])
}

const doAllFolds = (coordinates, folds) => {
    folds.forEach(fold => {
        coordinates = doFold(coordinates, fold);
    })
    return coordinates
}

const doFold = (coordinates, fold) => {
    const [axis, value] = fold;
    let newCoordinates = coordinates.map(coordinate => {
        if (axis === 'x') {
            if (coordinate[0] < value) return [coordinate[0], coordinate[1]];
            else if (coordinate[0] > value) return [Math.abs(coordinate[0] - (value * 2)), coordinate[1]];
        }
        else if (axis === 'y') {
            if (coordinate[1] < value) return [coordinate[0], coordinate[1]];
            else if (coordinate[1] > value) return [coordinate[0], Math.abs(coordinate[1] - (value * 2))];
        }
    })
    return removeDuplicates(newCoordinates)
}

console.log('Answer1:', doFold([...coordinates], folds[0]).length)
printTable(doAllFolds(coordinates, folds));

console.timeEnd('totalTime')