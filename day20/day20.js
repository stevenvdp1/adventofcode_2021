console.time('totalTime')
const fs = require('fs');
const path = require('path');
const _ = require('lodash')
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n\r\n')

const imageEnhancementAlgorithm = data[0].split('')
const inputImage = data[1].split('\r\n').map(line => line.split(''))

const binaryToDecimal = (binary) => {
    return parseInt(binary, 2)
}

const getNeighboursBinaryString = (image, x, y, fill) => {
    let binaryString = [
        image[y - 1] ? image[y - 1][x - 1] || fill : fill,
        image[y - 1] ? image[y - 1][x] || fill : fill,
        image[y - 1] ? image[y - 1][x + 1] || fill : fill,
        image[y][x - 1] || fill,
        image[y][x],
        image[y][x + 1] || fill,
        image[y + 1] ? image[y + 1][x - 1] || fill : fill,
        image[y + 1] ? image[y + 1][x] || fill : fill,
        image[y + 1] ? image[y + 1][x + 1] || fill : fill
    ]
    return binaryString.join('').replace(/\./g, '0').replace(/#/g, '1')
}

const enhanceImage = (image, fill) => {
    image.unshift(Array(image[0].length).fill(fill))
    image.push(Array(image[1].length).fill(fill))
    image.forEach(line => {
        line.unshift(fill)
        line.push(fill)
    })

    let result = _.cloneDeep(image)
    let litPixels = 0
    for (let y = 0; y < image.length; y++) {
        for (let x = 0; x < image[0].length; x++) {
            let binaryString = getNeighboursBinaryString(image, x, y, fill)
            let decimalValue = binaryToDecimal(binaryString)
            let pixel = imageEnhancementAlgorithm[decimalValue]
            result[y][x] = pixel
            if (pixel === '#') litPixels++
        }
    }
    return { result, litPixels }
}


const litPixelsAfterNthEnhancement = (image, n) => {
    let enhancement
    for (let i = 0; i < n; i++) {
        if (imageEnhancementAlgorithm[0] === '#') {
            if (i % 2 === 0) fill = '.'
            else fill = '#'
        }
        else fill = '.'
        enhancement = enhanceImage(image, fill)

        image = enhancement.result
    }
    return enhancement.litPixels
}

console.log('Answer1:', litPixelsAfterNthEnhancement(_.cloneDeep(inputImage), 2))
console.log('Answer2:', litPixelsAfterNthEnhancement(_.cloneDeep(inputImage), 50))
console.timeEnd('totalTime')