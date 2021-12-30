console.time('totalTime')
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const hexStringToBinString = (hex) => {
    return hex.split('').map(c => parseInt(c, 16).toString(2).padStart(4, '0')).join('')
}

const binToDec = (bin) => {
    return parseInt(bin.join(''), 2)
}

const getLiteralValue = (binString) => {
    let groups = binString.join('').match(/.{1,5}/g)
    let result = ''
    while (true) {
        let group = groups.shift()
        result += group.substring(1)
        if (group[0] === '0') break;
    }
    return { value: binToDec(result.split('')), binString: groups.join('').split('') }
}

const decode = (binString) => {
    let version = binToDec(binString.splice(0, 3))
    let typeId = binToDec(binString.splice(0, 3))
    if (typeId === 4) {
        let result = getLiteralValue(binString)
        return { version, typeId, value: result.value, binString: result.binString }
    }
    else {
        let lengthTypeId = Number(binString.shift())
        let result = { version, typeId, subPackets: [], binString: null, value: null }
        if (lengthTypeId === 0) {
            let length = binToDec(binString.splice(0, 15))
            let i = 0
            while (i < length) {
                let decoded = decode([...binString])
                i += binString.length - decoded.binString.length
                result.subPackets.push(decoded)
                result.version += decoded.version
                binString = decoded.binString
            }
        }
        else if (lengthTypeId === 1) {
            let number = binToDec(binString.splice(0, 11))
            while (number > 0) {
                let decoded = decode([...binString])
                binString = decoded.binString
                result.subPackets.push(decoded)
                result.version += decoded.version
                number--
            }
        }
        result.binString = binString

        switch (typeId) {
            case 0:
                result.value = result.subPackets.reduce((acc, cur) => acc + cur.value, 0)
                break;
            case 1:
                result.value = result.subPackets.reduce((acc, cur) => acc * cur.value, 1)
                break;
            case 2:
                result.value = Math.min(...result.subPackets.map(r => r.value))
                break;
            case 3:
                result.value = Math.max(...result.subPackets.map(r => r.value))
                break;
            case 5:
                result.value = (result.subPackets[0].value > result.subPackets[1].value ? 1 : 0)
                break
            case 6:
                result.value = (result.subPackets[0].value < result.subPackets[1].value ? 1 : 0)
                break;
            case 7:
                result.value = (result.subPackets[0].value === result.subPackets[1].value ? 1 : 0)
                break
        }

        return result
    }
}

let decoded = decode(hexStringToBinString(data).split(''))

console.log('Answer1:', decoded.version)
console.log('Answer2:', decoded.value)
console.timeEnd('totalTime')