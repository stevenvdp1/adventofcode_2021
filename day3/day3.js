const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n');

const getMostCommonValueInPosition = (data, pos) =>{
    const values = data.map(row => row[pos]);
    const counts = {};
    values.forEach(value => {
        counts[value] = counts[value] ? counts[value] + 1 : 1;
    });
    const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if(sortedCounts[1] && (sortedCounts[0][1] === sortedCounts[1][1])) return '1';
    return sortedCounts[0][0];
}

const gammaBinary = (data) => {
    let gammaBinary = '';
    for (let i = 0; i < data[0].length; i++) {
        gammaBinary += getMostCommonValueInPosition(data, i);
    }
    return gammaBinary;
}

const binaryToDecimal = (binary) => {
    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
        if (binary[i] === '1') decimal += Math.pow(2, binary.length - 1 - i);
    }
    return decimal;
}

const binaryComplement = (binary) => {
    let complement = '';
    binary.split('').forEach(b => {
        if (b === '0') complement += '1';
        else complement += '0';
    });
    return complement;
}

const powerConsumption = (data) => {
    let gammaBin = gammaBinary(data);
    let gammaDec = binaryToDecimal(gammaBin);
    let epsilonDec = binaryToDecimal(binaryComplement(gammaBin));
    return gammaDec * epsilonDec;
}

const oxygenRate = (data) => {
    for(let i = 0; i < data[0].length; i++) {
        let mostCommonVal = getMostCommonValueInPosition(data, i);
        data = data.filter(row => row[i] === mostCommonVal)
        if(data.length === 1) return binaryToDecimal(data[0])
    }
}

const co2ScrubberRate = (data)=>{
    for(let i = 0; i < data[0].length; i++) {
        let mostCommonVal = getMostCommonValueInPosition(data, i);
        data = data.filter(row => row[i] !== mostCommonVal)
        if(data.length === 1) return binaryToDecimal(data[0])
    }
}

const lifeSupportRate = (data) => {
    return oxygenRate(data) * co2ScrubberRate(data);
}

console.log(powerConsumption(data));
console.log(lifeSupportRate(data));


















// const getBinaryGamma = (data) =>{
//     let gamma = Array(12).fill(0);
//     data.split('').forEach((char,i) => {
//         if(Number(char)===0)gamma[i%12]++;
        
//     });
//     let string = '';
//     gamma.forEach(g=>{
//         if(g>data.length/12/2)string+='0';
//         else string += '1'
//     })
//     return string
// }



// const answer1 = (data) =>{
//     let gamma = getBinaryGamma(data);
//     console.log(gamma)
//     let gammaDec = binaryToDecimal(gamma);

//     console.log(gammaDec)

//     let epsilonDec = binaryToDecimal(binaryComplement(gamma));


//     return gammaDec*epsilonDec;
// }
// console.log(answer1(data));