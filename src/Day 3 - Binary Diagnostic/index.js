const inputFromFile = require('../../inputFromFile');

function part1(input) {
    const numberLength = input[0].length;
    let bitCountMap = {};

    for (let i = 0; i < numberLength; i++) {
        bitCountMap[i] = {
            0: 0,
            1: 0
        };
    }

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < numberLength; j++) {
            bitCountMap[j][input[i][j]]++;
        }
    }

    let gamma = '';
    let epsilon = '';
    for (let i = 0; i < numberLength; i++) {
        gamma += bitCountMap[i][0] > bitCountMap[i][1] ? '0' : '1';
        epsilon += bitCountMap[i][0] < bitCountMap[i][1] ? '0' : '1';
    }

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function part2(input) {
    const numberLength = input[0].length;

    let oxygenGeneratorRatingInput = input;
    let bitPosition = -1;
    do {
        bitPosition++;
        let zerosCount = 0;
        let onesCount = 0;

        for (let i = 0; i < oxygenGeneratorRatingInput.length; i++) {
            zerosCount += +oxygenGeneratorRatingInput[i][bitPosition] === 0 ? 1 : 0;
            onesCount += +oxygenGeneratorRatingInput[i][bitPosition] === 1 ? 1 : 0;
        }

        const mostCommonBit = zerosCount > onesCount ? 0 : 1;

        oxygenGeneratorRatingInput = oxygenGeneratorRatingInput.filter((value) => +value[bitPosition] === mostCommonBit);
    } while (oxygenGeneratorRatingInput.length != 1);

    oxygenGeneratorRating = parseInt(oxygenGeneratorRatingInput[0], 2);

    let co2ScrubberRatingInput = input;
    bitPosition = -1;
    do {
        bitPosition++;
        let zerosCount = 0;
        let onesCount = 0;

        for (let i = 0; i < co2ScrubberRatingInput.length; i++) {
            zerosCount += +co2ScrubberRatingInput[i][bitPosition] === 0 ? 1 : 0;
            onesCount += +co2ScrubberRatingInput[i][bitPosition] === 1 ? 1 : 0;
        }

        const leastCommonBit = onesCount < zerosCount ? 1 : 0;

        co2ScrubberRatingInput = co2ScrubberRatingInput.filter((value) => +value[bitPosition] === leastCommonBit);
    } while (co2ScrubberRatingInput.length != 1);

    co2ScrubberRating = parseInt(co2ScrubberRatingInput[0], 2);

    return oxygenGeneratorRating * co2ScrubberRating;
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(await inputFromFile.readAsArray(inputType, '\r\n')),
    partTwo: async (inputType = 'sample') => part2(await inputFromFile.readAsArray(inputType, '\r\n'))
};