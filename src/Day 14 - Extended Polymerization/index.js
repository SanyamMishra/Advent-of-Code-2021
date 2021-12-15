const inputFromFile = require('../../inputFromFile');

function polymerise(pairInsertionRulesMap, pairInsertionRulesFrequency) {
    const newPairInsertionRulesFrequency = { ...pairInsertionRulesFrequency };

    Object.entries(pairInsertionRulesFrequency)
        .forEach(([rule, frequency]) => {
            if (!frequency) return;

            newPairInsertionRulesFrequency[rule] -= frequency;
            newPairInsertionRulesFrequency[`${rule[0]}${pairInsertionRulesMap[rule]}`] += frequency;
            newPairInsertionRulesFrequency[`${pairInsertionRulesMap[rule]}${rule[1]}`] += frequency;
        });

    return newPairInsertionRulesFrequency;
}

function calculateScore(pairInsertionRulesFrequency) {
    let elementsFrequencyMap = {};

    Object.entries(pairInsertionRulesFrequency)
        .forEach(([rule, frequency]) => {
            if (elementsFrequencyMap[rule[0]] === undefined) {
                elementsFrequencyMap[rule[0]] = 0;
            }

            if (elementsFrequencyMap[rule[1]] === undefined) {
                elementsFrequencyMap[rule[1]] = 0;
            }

            elementsFrequencyMap[rule[0]] += frequency;
            elementsFrequencyMap[rule[1]] += frequency;
        });


    elementsFrequencyMap = Object.fromEntries(Object.entries(elementsFrequencyMap).map(([element, frequency]) => [element, Math.ceil(frequency / 2)]));

    let mostCommonFrequency = -Infinity;
    let leastCommonFrequency = Infinity;

    Object.values(elementsFrequencyMap)
        .forEach(frequency => {
            if (frequency > mostCommonFrequency) {
                mostCommonFrequency = frequency;
            }

            if (frequency < leastCommonFrequency) {
                leastCommonFrequency = frequency;
            }
        });

    return mostCommonFrequency - leastCommonFrequency;
}

function part1(pairInsertionRulesMap, pairInsertionRulesFrequency) {
    stepCount = 10;
    while (stepCount--) {
        pairInsertionRulesFrequency = polymerise(pairInsertionRulesMap, pairInsertionRulesFrequency);
    }

    return calculateScore(pairInsertionRulesFrequency);
}

function part2(pairInsertionRulesMap, pairInsertionRulesFrequency) {
    stepCount = 40;
    while (stepCount--) {
        pairInsertionRulesFrequency = polymerise(pairInsertionRulesMap, pairInsertionRulesFrequency);
    }

    return calculateScore(pairInsertionRulesFrequency);
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(...await inputFromFile.readDay14Input(inputType, '\r\n')),
    partTwo: async (inputType = 'sample') => part2(...await inputFromFile.readDay14Input(inputType, '\r\n'))
};