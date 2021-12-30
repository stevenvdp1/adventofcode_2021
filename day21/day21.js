console.time('totalTime')
const fs = require('fs');
const path = require('path');
const _ = require('lodash')
const newPlayer = (start, id) => ({ position: Number(start) - 1, score: 0, id })

const players = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\r\n').map((line, index) => newPlayer(line[line.length - 1], index))

const warmUpRound = (players) => {
    let totalRolls = 0
    let lastRoll = 0
    while (true) {
        let player = players.shift()
        for (let i = 0; i < 3; i++) {
            lastRoll = (totalRolls % 100) + 1
            totalRolls++
            player.position = ((player.position + lastRoll) % 10)
        }
        player.score += player.position + 1
        if (player.score >= 1000) break
        players.push(player)
    }
    return totalRolls * players[0].score
}


let states = new Map()
const diracDice = (players) => {
    if (players[0].score >= 21) return [1, 0]
    if (players[1].score >= 21) return [0, 1]

    if (states.has(JSON.stringify(players))) return states.get(JSON.stringify(players))
    let wins = [0, 0]
    for (let d1 = 1; d1 <= 3; d1++) {
        for (let d2 = 1; d2 <= 3; d2++) {
            for (let d3 = 1; d3 <= 3; d3++) {
                let player = _.cloneDeep(players[0])
                player.position = ((player.position + d1 + d2 + d3) % 10)
                player.score += player.position + 1
                if (player.score >= 21) {
                    wins[player.id]++
                }
                else {
                    let res = diracDice([players[1], player])
                    wins[0] += res[0]
                    wins[1] += res[1]
                }
            }
        }
    }
    states.set(JSON.stringify(players), wins)
    return wins
}



console.log('Answer1:', warmUpRound(_.cloneDeep(players)))
console.log('Answer2:', Math.max(...diracDice(_.cloneDeep(players))))
console.timeEnd('totalTime')