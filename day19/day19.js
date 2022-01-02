const fs = require('fs');
const path = require('path');

const getScannerWithOrientation = (scanner, orientation) => {
    const direction = Math.floor(orientation / 4);
    const rotation = orientation % 4;
    return scanner.map(([x, y, z]) => {
        if (direction === 1) [y, z] = [z, -y];
        if (direction === 2) [y, z] = [-z, y];
        if (direction === 3) [x, z] = [-z, x];
        if (direction === 4) [x, z] = [z, -x];
        if (direction === 5) [x, z] = [-x, -z];
        if (rotation === 1) [x, y] = [-y, x];
        if (rotation === 2) [x, y] = [-x, -y];
        if (rotation === 3) [x, y] = [y, -x];
        return [x, y, z];
    });
};

const reorientScanners = scannerData => {
    const adjustedScanners = [{ position: [0, 0, 0], beacons: scannerData.shift(), isChecked: false }];

    while (scannerData.length) {
        for (let i = 0; i < adjustedScanners.length; ++i) {
            const { position, beacons, isChecked } = adjustedScanners[i];
            if (isChecked) continue;
            adjustedScanners[i].isChecked = true;

            innerScannerLoop: for (let j = scannerData.length - 1; j >= 0; --j) {
                const scannerToTest = scannerData[j];

                for (let k = 0; k < 24; ++k) {
                    const reorientedScanner = getScannerWithOrientation(scannerToTest, k);
                    const relativeDistances = {};

                    for (const [x, y, z] of beacons) {
                        for (const [xx, yy, zz] of reorientedScanner) {
                            const key = (x - xx).toString() + ' ' + (y - yy).toString() + ' ' + (z - zz).toString();
                            relativeDistances[key] = relativeDistances[key] + 1 || 1;

                            if (relativeDistances[key] >= 12) {
                                const [offsetX, offsetY, offsetZ] = key.split(' ').map(Number);
                                scannerData.splice(j, 1);

                                adjustedScanners.push({
                                    position: [position[0] + offsetX, position[1] + offsetY, position[2] + offsetZ],
                                    beacons: reorientedScanner,
                                    isChecked: false,
                                });

                                continue innerScannerLoop;
                            }
                        }
                    }
                }
            }
        }
    }

    return adjustedScanners;
};

const p1 = scanners => {
    const uniquePoints = new Set();
    for (const { position, beacons } of scanners) {
        for (const [x, y, z] of beacons) {
            uniquePoints.add(x + position[0] + ' ' + (y + position[1]) + ' ' + (z + position[2]));
        }
    }
    return uniquePoints.size;
};

const p2 = scanners => {
    let maxDistance = 0;
    const scannerPositions = scanners.map(scanner => scanner.position);
    for (const [x, y, z] of scannerPositions) {
        for (const [xx, yy, zz] of scannerPositions) {
            maxDistance = Math.max(maxDistance, Math.abs(x - xx) + Math.abs(y - yy) + Math.abs(z - zz));
        }
    }
    return maxDistance;
};

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .split('\r\n')
    .filter(line => line !== '');
const scannerData = [];

for (const line of input) {
    if (line.includes('scanner')) scannerData.push([]);
    else scannerData[scannerData.length - 1].push(line.split(',').map(Number));
}

console.time('Time to Reorient Scanners');
const adjustedScanners = reorientScanners(scannerData);
console.timeEnd('Time to Reorient Scanners');
console.log();

console.time('Part 1 Time');
console.log('Part 1:', p1(adjustedScanners));
console.timeEnd('Part 1 Time');
console.log();

console.time('Part 2 Time');
console.log('Part 2:', p2(adjustedScanners));
console.timeEnd('Part 2 Time');