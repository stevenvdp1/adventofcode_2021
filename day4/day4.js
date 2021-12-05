const time = new Date()

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n');

const readInput = (data) => {
    let numbers = data.shift().split(',').map(Number);
    data = data.map(line => line.trim().replace(/  /gi, ' ').split(' '));
    data.shift();
    let cards = []
    let currentCard = []
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] === '') {
            cards.push(currentCard)
            currentCard = []
        }
        else {
            currentCard.push(data[i].map(Number))
        }
    }
    cards.push(currentCard)

    return [numbers, cards]
}

const findWinningCard = (data) => {
    let [numbers, cards] = readInput(data)
    let currentNumber
    let bingoCard = null
    while (numbers.length > 0 && !bingoCard) {
        currentNumber = numbers.shift()
        for (let card of cards) {
            let rowIndex = card.findIndex(row => row.includes(currentNumber))
            if (rowIndex !== -1) {
                let colIndex = card[rowIndex].findIndex(col => col === currentNumber)
                card[rowIndex][colIndex] = 'X'
            }
            if (doesCardHaveBingo(card)) {
                bingoCard = card
                break
            }
        }
    }
    return bingoCard.flat().filter(num => num !== 'X').reduce((acc, curr) => acc + curr, 0) * currentNumber
}

const doesCardHaveBingo = (card) => {
    if (card.some(row => row.every(col => col === 'X'))) return true
    for (let i = 0; i < card.length; i++) {
        if (card.every(row => row[i] === 'X')) return true
    }
    return false
}

const findLosingCard = (data) => {
    let [numbers, cards] = readInput(data)
    let currentNumber
    let losingCard = null
    while (!losingCard) {
        currentNumber = numbers.shift()
        for (let card of cards) {
            let rowIndex = card.findIndex(row => row.includes(currentNumber))
            if (rowIndex !== -1) {
                let colIndex = card[rowIndex].findIndex(col => col === currentNumber)
                card[rowIndex][colIndex] = 'X'
            }
        }
        if (cards.length > 1) cards = cards.filter(card => !doesCardHaveBingo(card))
        else if (doesCardHaveBingo(cards[0])) losingCard = cards[0]
    }
    return cards.flat(2).filter(num => num !== 'X').reduce((acc, curr) => acc + curr, 0) * currentNumber
}


console.log('Answer1: ',findWinningCard([...data]));
console.log('Answer2: ',findLosingCard([...data]));

console.log('Time (ms):', new Date() - time)