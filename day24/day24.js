console.time('totalTime')


const part1 = () => {
    for (let a = 9; a > 0; a--) {
        let zA = a + 1
        for (let b = 9; b > 0; b--) {
            let zb = 26 * zA + b + 9
            for (let c = 9; c > 0; c--) {
                let zC = 26 * zb + c + 11
                for (let d = 9; d > 0; d--) {
                    // MET MOD
                    let modD = (zC % 26) - 13
                    if (modD !== d) continue
                    let zD = Math.floor(zC / 26)
                    for (let e = 9; e > 0; e--) {
                        let zE = 26 * zD + e + 6
                        for (let f = 9; f > 0; f--) {
                            let zF = 26 * zE + f + 13
                            for (let g = 9; g > 0; g--) {
                                // MET MOD
                                let modG = (zF % 26) - 14
                                if (modG !== g) continue
                                let zG = Math.floor(zF / 26)
                                for (let h = 9; h > 0; h--) {
                                    let zH = 26 * zG + h + 5
                                    for (let i = 9; i > 0; i--) {
                                        // MET MOD
                                        let modI = (zH % 26) - 8
                                        if (modI !== i) continue
                                        let zI = Math.floor(zH / 26)
                                        for (let j = 9; j > 0; j--) {
                                            let zJ = 26 * zI + j + 2
                                            for (let k = 9; k > 0; k--) {
                                                // MET MOD
                                                let modK = (zJ % 26) - 9
                                                if (modK !== k) continue
                                                let zK = Math.floor(zJ / 26)
                                                for (let l = 9; l > 0; l--) {
                                                    // MET MOD
                                                    let modL = (zK % 26) - 11
                                                    if (modL !== l) continue
                                                    let zL = Math.floor(zK / 26)
                                                    for (let m = 9; m > 0; m--) {
                                                        // MET MOD
                                                        let modM = (zL % 26) - 6
                                                        if (modM !== m) continue
                                                        let zM = Math.floor(zL / 26)
                                                        for (let n = 9; n > 0; n--) {
                                                            //MET MOD
                                                            let modN = (zM % 26) - 5
                                                            if (modN === n) {
                                                                let ans1 = Math.floor(zM / 26)
                                                                if (ans1 === 0) {
                                                                    return Number('' + a + b + c + d + e + f + g + h + i + j + k + l + m + n)
                                                                    
                                                                }
                                                            }
                                                            else {
                                                                let ans2 = zM + n + 7
                                                                if (ans2 === 0) {
                                                                    return Number('' + a + b + c + d + e + f + g + h + i + j + k + l + m + n)
                                                                    
                                                                }
                                                            }
    
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

const part2 = () => {
    for (let a = 1; a < 10; a++) {
        let zA = a + 1
        for (let b = 1; b < 10; b++) {
            let zb = 26 * zA + b + 9
            for (let c = 1; c < 10; c++) {
                let zC = 26 * zb + c + 11
                for (let d = 1; d < 10; d++) {
                    // MET MOD
                    let modD = (zC % 26) - 13
                    if (modD !== d) continue
                    let zD = Math.floor(zC / 26)
                    for (let e = 1; e < 10; e++) {
                        let zE = 26 * zD + e + 6
                        for (let f = 1; f < 10; f++) {
                            let zF = 26 * zE + f + 13
                            for (let g = 1; g < 10; g++) {
                                // MET MOD
                                let modG = (zF % 26) - 14
                                if (modG !== g) continue
                                let zG = Math.floor(zF / 26)
                                for (let h = 1; h < 10; h++) {
                                    let zH = 26 * zG + h + 5
                                    for (let i = 1; i < 10; i++) {
                                        // MET MOD
                                        let modI = (zH % 26) - 8
                                        if (modI !== i) continue
                                        let zI = Math.floor(zH / 26)
                                        for (let j = 1; j < 10; j++) {
                                            let zJ = 26 * zI + j + 2
                                            for (let k = 1; k < 10; k++) {
                                                // MET MOD
                                                let modK = (zJ % 26) - 9
                                                if (modK !== k) continue
                                                let zK = Math.floor(zJ / 26)
                                                for (let l = 1; l < 10; l++) {
                                                    // MET MOD
                                                    let modL = (zK % 26) - 11
                                                    if (modL !== l) continue
                                                    let zL = Math.floor(zK / 26)
                                                    for (let m = 1; m < 10; m++) {
                                                        // MET MOD
                                                        let modM = (zL % 26) - 6
                                                        if (modM !== m) continue
                                                        let zM = Math.floor(zL / 26)
                                                        for (let n = 1; n < 10; n++) {
                                                            //MET MOD
                                                            let modN = (zM % 26) - 5
                                                            if (modN === n) {
                                                                let ans1 = Math.floor(zM / 26)
                                                                if (ans1 === 0) {
                                                                    return Number('' + a + b + c + d + e + f + g + h + i + j + k + l + m + n)
                                                                }
                                                            }
                                                            else {
                                                                let ans2 = zM + n + 7
                                                                if (ans2 === 0) {
                                                                    return Number('' + a + b + c + d + e + f + g + h + i + j + k + l + m + n)
                                                                }
                                                            }
    
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

console.log('Answer1:', part1())
console.log('Answer2:', part2())

console.timeEnd('totalTime')