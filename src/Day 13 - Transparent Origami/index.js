const inputFromFile = require('../../inputFromFile');

function fold(dotsMap, foldInstruction) {
    if (foldInstruction.axis === 'y') {
        Object.entries(dotsMap)
            .forEach(([x, col]) => Object.keys(col)
                .forEach(y => {
                    if (+y < foldInstruction.lineNumber) return;

                    dotsMap[x][(2 * foldInstruction.lineNumber) - +y] = '#';

                    delete dotsMap[x][y];
                })
            );
    } else {
        Object.entries(dotsMap)
            .forEach(([x, col]) => Object.keys(col)
                .forEach(y => {
                    if (+x < foldInstruction.lineNumber) return;

                    if (dotsMap[(2 * foldInstruction.lineNumber) - +x] === undefined) {
                        dotsMap[(2 * foldInstruction.lineNumber) - +x] = {};
                    }

                    dotsMap[(2 * foldInstruction.lineNumber) - +x][y] = '#';

                    delete dotsMap[x][y];
                })
            );
    }
}

function countDots(dotsMap) {
    return Object.values(dotsMap)
        .map(col => Object.keys(col))
        .reduce((prev, curr) => prev + curr.length, 0);
}

function printDots(dotsMap) {
    let maxX = 0;
    let maxY = 0;

    Object.entries(dotsMap)
        .forEach(([x, col]) => Object.keys(col)
            .forEach(y => {
                if (+x > maxX) maxX = x;
                if (+y > maxY) maxY = y;
            })
        );

    for (let y = 0; y <= maxY; y++) {
        str = '';
        for (let x = 0; x <= maxX; x++) {
            if (dotsMap[x] && dotsMap[x][y]) str += '#';
            else str += '.';
        }
        console.log(str);
    }
}

function part1(dotsMap, foldInstructions) {
    fold(dotsMap, foldInstructions[0]);
    return countDots(dotsMap);
}

function part2(dotsMap, foldInstructions) {
    foldInstructions.forEach(foldInstruction => fold(dotsMap, foldInstruction));
    printDots(dotsMap);
    return '--------';
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(...await inputFromFile.readDay13Input(inputType, '\r\n')),
    partTwo: async (inputType = 'sample') => part2(...await inputFromFile.readDay13Input(inputType, '\r\n'))
};