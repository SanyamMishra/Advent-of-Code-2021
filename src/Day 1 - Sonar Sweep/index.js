const inputFromFile = require('../../inputFromFile');

function part1(input) {
    increaseCount = 0;

    for (let i = 1; i < input.length; i++) {
        if (input[i] > input[i - 1]) {
            increaseCount++;
        }
    }

    return increaseCount;
}

function part2(input) {
    increaseCount = 0;

    for (let i = 1; i < input.length - 2; i++) {
        if ((input[i] + input[i + 1] + input[i + 2]) > (input[i - 1] + input[i] + input[i + 1])) {
            increaseCount++;
        }
    }

    return increaseCount;
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(await inputFromFile.readAsArrayOfNumbers(inputType, '\r\n')),
    partTwo: async (inputType = 'sample') => part2(await inputFromFile.readAsArrayOfNumbers(inputType, '\r\n'))
};