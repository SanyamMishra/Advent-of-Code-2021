const inputFromFile = require('../../inputFromFile');

function getAdjacentUnflashedLocations(flashLocation, input, flashedLocationsMap) {
    const adjacentLocations = [];

    const x = flashLocation[0];
    const y = flashLocation[1];

    if (x - 1 >= 0) {
        if (flashedLocationsMap[x - 1][y] === null) adjacentLocations.push([x - 1, y]);

        if (y - 1 >= 0 && flashedLocationsMap[x - 1][y - 1] === null) {
            adjacentLocations.push([x - 1, y - 1]);
        }

        if (y + 1 < input[x].length && flashedLocationsMap[x - 1][y + 1] === null) {
            adjacentLocations.push([x - 1, y + 1]);
        }
    }

    if (x + 1 < input.length) {
        if (flashedLocationsMap[x + 1][y] === null) adjacentLocations.push([x + 1, y]);

        if (y - 1 >= 0 && flashedLocationsMap[x + 1][y - 1] === null) {
            adjacentLocations.push([x + 1, y - 1]);
        }

        if (y + 1 < input[x].length && flashedLocationsMap[x + 1][y + 1] === null) {
            adjacentLocations.push([x + 1, y + 1]);
        }
    }

    if (y - 1 >= 0 && flashedLocationsMap[x][y - 1] === null) {
        adjacentLocations.push([x, y - 1]);
    }

    if (y + 1 < input[x].length && flashedLocationsMap[x][y + 1] === null) {
        adjacentLocations.push([x, y + 1]);
    }

    return adjacentLocations;
}

function simulateStep(input) {
    const flashLocationsQueue = [];
    const flashedLocationsMap = [];

    for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
        flashedLocationsMap[rowIndex] = [];

        for (let columnIndex = 0; columnIndex < input[rowIndex].length; columnIndex++) {
            input[rowIndex][columnIndex]++;

            if (input[rowIndex][columnIndex] > 9) flashLocationsQueue.push([rowIndex, columnIndex]);

            flashedLocationsMap[rowIndex][columnIndex] = null;
        }
    }

    let flashCount = 0;

    while (flashLocationsQueue.length) {
        const flashLocation = flashLocationsQueue.shift();
        flashedLocationsMap[flashLocation[0]][flashLocation[1]] = true;
        flashCount++;

        const adjacentLocations = getAdjacentUnflashedLocations(flashLocation, input, flashedLocationsMap);

        for (let index = 0; index < adjacentLocations.length; index++) {
            const adjacentLocation = adjacentLocations[index];

            input[adjacentLocation[0]][adjacentLocation[1]]++;

            if (
                input[adjacentLocation[0]][[adjacentLocation[1]]] > 9 &&
                flashLocationsQueue.filter(flashLocation => flashLocation[0] === adjacentLocation[0] && flashLocation[1] === adjacentLocation[1]).length === 0
            ) {
                flashLocationsQueue.push(adjacentLocation);
            }
        }
    }

    for (let rowIndex = 0; rowIndex < flashedLocationsMap.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < flashedLocationsMap[rowIndex].length; columnIndex++) {
            if (flashedLocationsMap[rowIndex][columnIndex]) {
                input[rowIndex][columnIndex] = 0;
            }
        }
    }

    return flashCount;
}

function allOctopusesFlashed(input) {
    for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < input[rowIndex].length; columnIndex++) {
            if (input[rowIndex][columnIndex] !== 0) return false;
        }
    }

    return true;
}

function part1(input) {
    sum = 0;
    steps = 100;
    while (steps-- > 0) {
        sum += simulateStep(input);
    }

    return sum;
}

function part2(input) {
    stepCount = 0;
    while (true) {
        stepCount++;
        simulateStep(input);
        if (allOctopusesFlashed(input)) return stepCount;
    }
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(await inputFromFile.readAsGridOfNumbers(inputType, '\r\n')),
    partTwo: async (inputType = 'sample') => part2(await inputFromFile.readAsGridOfNumbers(inputType, '\r\n'))
};