console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n').map(line => [line.substring(0, 2), [...line.substring(3).matchAll(/-?\d+/g)].map(b => Number(b[0]))])

const lineOverlap = (min0, max0, min1, max1) => [Math.max(min0, min1), Math.min(max0, max1)];
const volume = (box) => (box.x2 - box.x1 + 1) * (box.y2 - box.y1 + 1) * (box.z2 - box.z1 + 1)
const createBox = (x1, x2, y1, y2, z1, z2) => ({ x1, x2, y1, y2, z1, z2 })

const getOverlap = (box, allBoxes) => {
    return allBoxes.map((b, index) => {
        let [minX, maxX] = lineOverlap(box.x1, box.x2, b.x1, b.x2)
        let [minY, maxY] = lineOverlap(box.y1, box.y2, b.y1, b.y2)
        let [minZ, maxZ] = lineOverlap(box.z1, box.z2, b.z1, b.z2)
        if (maxX - minX > 0 && maxY - minY > 0 && maxZ - minZ > 0) {
            let tempBox = createBox(minX, maxX, minY, maxY, minZ, maxZ)
            return volume(tempBox) - getOverlap(tempBox, allBoxes.slice(index + 1))
        }
        else return 0
    }).reduce((acc, curr) => acc + curr, 0)
}

const totalBoxesOn = (data) => {
    let totalOn = 0
    let boxes = []
    data.reverse().forEach(d => {
        let box = createBox(...d[1])
        if (d[0] === 'on') {
            totalOn += (volume(box) - getOverlap(box, boxes))
        }
        boxes.push(box)
    });
    return totalOn
}

console.log('Answer1:', totalBoxesOn(data.filter(line => !line[1].some(val => val < -50 || val > 50))))
console.log('Answer2:', totalBoxesOn(data))
console.timeEnd('totalTime')
