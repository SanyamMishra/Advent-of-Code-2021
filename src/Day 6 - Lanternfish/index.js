const inputFromFile = require('../../inputFromFile');

const clockMap = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {}
};

function growLanternfish(initialTimer, days) {
    if (clockMap[initialTimer][days]) return clockMap[initialTimer][days];

    if (initialTimer >= days) {
        clockMap[initialTimer][days] = 1;
    } else {
        clockMap[initialTimer][days] = growLanternfish(6, days - initialTimer - 1) + growLanternfish(8, days - initialTimer - 1);
    }

    return clockMap[initialTimer][days];
}

function growLanternfishes(input, days) {
    sum = 0;

    for (let i = 0; i < input.length; i++) {
        sum += growLanternfish(input[i], days);
    }

    return sum;
}

function part1(input) {
    return growLanternfishes(input, 80);
}

function part2(input) {
    return growLanternfishes(input, 256);
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(await inputFromFile.readAsArrayOfNumbers(inputType)),
    partTwo: async (inputType = 'sample') => part2(await inputFromFile.readAsArrayOfNumbers(inputType))
};