const inputFromFile = require('../../inputFromFile');

function findAdjacentPoints(i, j, heightMap) {
    const adjacentPoints = [];

    if (i - 1 >= 0) {
        adjacentPoints.push([i - 1, j]);
    }
    if (i + 1 < heightMap.length) {
        adjacentPoints.push([i + 1, j]);
    }
    if (j - 1 >= 0) {
        adjacentPoints.push([i, j - 1]);
    }
    if (j + 1 < heightMap[i].length) {
        adjacentPoints.push([i, j + 1]);
    }

    return adjacentPoints;
}

function findLowPoints(heightMap) {
    const lowPoints = [];

    for (let i = 0; i < heightMap.length; i++) {
        for (let j = 0; j < heightMap[i].length; j++) {
            const adjacentPoints = findAdjacentPoints(i, j, heightMap);

            let isLowPoint = true;
            for (let k = 0; k < adjacentPoints.length; k++) {
                if (heightMap[i][j] >= heightMap[adjacentPoints[k][0]][adjacentPoints[k][1]]) {
                    isLowPoint = false;
                    break;
                }
            }

            if (isLowPoint) {
                lowPoints.push([i, j]);
            }
        }
    }

    return lowPoints;
}

function calculateRisk(lowPoints, heightMap) {
    let risk = 0;

    lowPoints.forEach(point => {
        risk += +heightMap[point[0]][point[1]] + 1;
    });

    return risk;
}

function generateBasinMap(lowPoints, heightMap) {
    const basinMap = [];

    for (let i = 0; i < heightMap.length; i++) {
        basinMap[i] = [];
        for (let j = 0; j < heightMap[i].length; j++) {
            basinMap[i][j] = null;
        }
    }

    lowPoints.forEach((lowPoint, index) => {
        basinPointsScanQueue = [lowPoint];

        while (basinPointsScanQueue.length) {
            const point = basinPointsScanQueue.shift();

            basinMap[point[0]][point[1]] = index;

            const adjacentPoints = findAdjacentPoints(...point, heightMap);

            adjacentPoints.forEach(adjacentPoint => {
                if (
                    +heightMap[adjacentPoint[0]][adjacentPoint[1]] !== 9 &&
                    basinMap[adjacentPoint[0]][adjacentPoint[1]] === null
                ) {
                    basinPointsScanQueue.push(adjacentPoint);
                }
            });
        }
    });

    return basinMap;
}

function calculateBasinSizes(basinMap) {
    const basinSizes = [];

    for (let i = 0; i < basinMap.length; i++) {
        const row = basinMap[i];
        for (let j = 0; j < row.length; j++) {
            const basin = row[j];

            if (basin === null) continue;

            if (!basinSizes[basin]) {
                basinSizes[basin] = 1;
            } else {
                basinSizes[basin]++;
            }
        }
    }

    return basinSizes;
}

function part1(input) {
    return calculateRisk(findLowPoints(input), input);
}

function part2(input) {
    const basinMap = generateBasinMap(findLowPoints(input), input);

    const basinSizes = calculateBasinSizes(basinMap);

    const largestBasins = basinSizes.sort((a, b) => a - b).slice(-3);

    return largestBasins[0] * largestBasins[1] * largestBasins[2];
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(await inputFromFile.readAsArray(inputType, '\r\n')),
    partTwo: async (inputType = 'sample') => part2(await inputFromFile.readAsArray(inputType, '\r\n'))
};