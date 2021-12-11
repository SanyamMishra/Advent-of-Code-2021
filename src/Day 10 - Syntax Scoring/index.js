const inputFromFile = require('../../inputFromFile');

const complementCharacterMap = {
    '(': ')',
    ')': '(',
    '[': ']',
    ']': '[',
    '{': '}',
    '}': '{',
    '<': '>',
    '>': '<',
};

function analyseNavigationSubsystem(navigationSubsystem) {
    const navigationSubsystemReport = [];

    navigationSubsystem.forEach((line, lineNumber) => {
        const stack = [];

        for (let index = 0; index < line.length; index++) {
            const character = line[index];

            if (['(', '[', '{', '<'].includes(character)) {
                stack.push(character);
                continue;
            }

            if (character !== complementCharacterMap[stack.pop()]) {
                navigationSubsystemReport.push({
                    status: 'corrupt',
                    details: {
                        character,
                        index
                    }
                });
                break;
            }
        }

        if (navigationSubsystemReport[lineNumber]) {
            return;
        }

        if (stack.length) {
            navigationSubsystemReport.push({
                status: 'incomplete',
                details: {
                    stack
                }
            });
        } else {
            navigationSubsystemReport.push({
                status: 'complete',
                details: null
            });
        }
    });

    return navigationSubsystemReport;
}

function calculateSyntaxCheckerScore(navigationSubsystemReport) {
    const scoreReferenceMap = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    };
    let score = 0;

    navigationSubsystemReport.forEach(record => {
        if (record.status !== 'corrupt') return;

        score += scoreReferenceMap[record.details.character];
    });

    return score;
}

function calculateAutocompleteScore(navigationSubsystemReport) {
    const scoreReferenceMap = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    };

    const filteredNavigationSubsystemReport = navigationSubsystemReport.filter(record => record.status === 'incomplete');

    filteredNavigationSubsystemReport.forEach(record => {
        let score = 0;
        while (true) {
            const character = record.details.stack.pop();

            if (!character) {
                break;
            }

            score *= 5;
            score += scoreReferenceMap[complementCharacterMap[character]];
        }

        record.details.score = score;
    });

    filteredNavigationSubsystemReport.sort((a, b) => a.details.score - b.details.score);

    return filteredNavigationSubsystemReport[parseInt(filteredNavigationSubsystemReport.length / 2)].details.score;
}

function part1(input) {
    return calculateSyntaxCheckerScore(analyseNavigationSubsystem(input));
}

function part2(input) {
    return calculateAutocompleteScore(analyseNavigationSubsystem(input))
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(await inputFromFile.readAsArray(inputType, '\r\n')),
    partTwo: async (inputType = 'sample') => part2(await inputFromFile.readAsArray(inputType, '\r\n'))
};