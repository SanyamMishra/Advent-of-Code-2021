const inputFromFile = require('../../inputFromFile');

function calculateFrequencyAndAverage(input) {
    const frequencyMap = {};
    let sum = 0;

    input.forEach(element => {
        if (frequencyMap[element]) frequencyMap[element]++;
        else frequencyMap[element] = 1;

        sum += element;
    });

    const average = sum / input.length;

    return {
        frequencyMap,
        average
    };
}

function calculateCost(frequencyMap, targetPosition) {
    let cost = 0;

    for (let [element, frequency] of Object.entries(frequencyMap)) {
        cost += Math.abs(element - targetPosition) * frequency;
    }

    return cost;
}

function calculateCost2(frequencyMap, targetPosition) {
    let cost = 0;

    for (let [element, frequency] of Object.entries(frequencyMap)) {
        const diff = Math.abs(element - targetPosition);

        cost += ((diff * (diff + 1)) / 2) * frequency;
    }

    return cost;
}

function calculateMinimumCost(frequencyMap, average, costingFunction) {
    let currentTargetPosition = Math.round(average);
    do {
        currentTargetPositionCost = costingFunction(frequencyMap, currentTargetPosition);
        upperTargetPositionCost = costingFunction(frequencyMap, currentTargetPosition + 1);
        lowerTargetPositionCost = costingFunction(frequencyMap, currentTargetPosition - 1);

        if (currentTargetPositionCost < upperTargetPositionCost && currentTargetPositionCost < lowerTargetPositionCost) {
            return currentTargetPositionCost;
        }

        if (currentTargetPositionCost > upperTargetPositionCost) {
            currentTargetPosition++;
        } else {
            currentTargetPosition--;
        }
    } while (true);
}

function part1(input) {
    const {
        frequencyMap,
        average
    } = calculateFrequencyAndAverage(input);

    return calculateMinimumCost(frequencyMap, average, calculateCost);
}

function part2(input) {
    const {
        frequencyMap,
        average
    } = calculateFrequencyAndAverage(input);

    return calculateMinimumCost(frequencyMap, average, calculateCost2);
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(await inputFromFile.readAsArrayOfNumbers(inputType)),
    partTwo: async (inputType = 'sample') => part2(await inputFromFile.readAsArrayOfNumbers(inputType))
};