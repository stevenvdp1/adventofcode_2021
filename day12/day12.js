console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n').map(line => line.split('-'));

const isUpperCase = (str) => str === str.toUpperCase()

const getNodes = (data) => {
    let nodes = new Map();
    new Set(data.flat()).forEach(node => {
        if (node !== 'end') {
            let children = data.filter(line => line[0] === node || line[1] === node).flat().filter(n => n !== node && n !== 'start')
            nodes.set(node, children)
        }
    })
    return nodes
}

const getPaths = (nodes, paths) => {
    let newPaths = [];
    paths.forEach(path => {
        let last = path[path.length - 1]
        let children = nodes.get(last)
        children.forEach(child => {
            if (!path.includes(child) || isUpperCase(child)) {
                if (child === 'end') newPaths.push([...path, child])
                else {
                    let newPath = [...path, child]
                    newPaths.push(...getPaths(nodes, [newPath]))
                }
            }
        })
    })
    return newPaths
}

const getPaths2 = (nodes, paths) => {
    let newPaths = [];
    paths.forEach(({ path, hasDouble }) => {
        let last = path[path.length - 1]
        let children = nodes.get(last)
        children.forEach(child => {
            if (isUpperCase(child) || !path.includes(child) || !hasDouble) {
                if (child === 'end') newPaths.push([...path, child])
                else {
                    let newPath = { path: [...path, child], hasDouble: hasDouble || (!isUpperCase(child)&&path.includes(child)) }
                    newPaths.push(...getPaths2(nodes, [newPath]))
                }
            }
        })
    })
    return newPaths
}

const nodes = getNodes(data)
console.log('Answer1:', getPaths(nodes, [['start']]).length)
console.log('Answer2:', getPaths2(nodes, [{ path: ['start'], hasDouble: false }]).length)
console.timeEnd('totalTime')