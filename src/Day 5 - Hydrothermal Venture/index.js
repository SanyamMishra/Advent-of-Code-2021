const inputFromFile = require('../../inputFromFile');

function getLineSegmentOrientation(lineSegment) {
    if (lineSegment.from.y === lineSegment.to.y) return 'horizontal';

    if (lineSegment.from.x === lineSegment.to.x) return 'vertical';

    slope = (lineSegment.to.y - lineSegment.from.y) / (lineSegment.to.x - lineSegment.from.x);
    if (Math.abs(slope) === 1) {
        return 'diagonal';
    }

    return 'other';
}

function mapHorizontalLineSegment(lineSegment, gridMap) {
    const start = lineSegment.from.x < lineSegment.to.x ? lineSegment.from.x : lineSegment.to.x;
    const end = lineSegment.from.x < lineSegment.to.x ? lineSegment.to.x : lineSegment.from.x;

    for (let i = start; i <= end; i++) {
        if (!gridMap[i]) {
            gridMap[i] = {};
        }

        if (!gridMap[i][lineSegment.from.y]) {
            gridMap[i][lineSegment.from.y] = 1;
        } else {
            gridMap[i][lineSegment.from.y]++;
        }
    }
}

function mapVerticalLineSegment(lineSegment, gridMap) {
    const start = lineSegment.from.y < lineSegment.to.y ? lineSegment.from.y : lineSegment.to.y;
    const end = lineSegment.from.y < lineSegment.to.y ? lineSegment.to.y : lineSegment.from.y;

    if (!gridMap[lineSegment.from.x]) {
        gridMap[lineSegment.from.x] = {};
    }

    for (let i = start; i <= end; i++) {
        if (!gridMap[lineSegment.from.x][i]) {
            gridMap[lineSegment.from.x][i] = 1;
        } else {
            gridMap[lineSegment.from.x][i]++;
        }
    }
}

function mapDiagonalLineSegment(lineSegment, gridMap) {
    let x = lineSegment.from.x;
    let y = lineSegment.from.y;

    for (let i = 0; i <= Math.abs(lineSegment.to.x - lineSegment.from.x); i++) {
        if (!gridMap[x]) {
            gridMap[x] = {};
        }

        if (!gridMap[x][y]) {
            gridMap[x][y] = 1;
        } else {
            gridMap[x][y]++;
        }

        if (lineSegment.to.x > lineSegment.from.x) {
            x++;
        } else {
            x--;
        }

        if (lineSegment.to.y > lineSegment.from.y) {
            y++;
        } else {
            y--;
        }
    }
}

function createPartialGridMap(input) {
    const gridMap = {};

    input.forEach(lineSegment => {
        if (getLineSegmentOrientation(lineSegment) === 'horizontal') {
            mapHorizontalLineSegment(lineSegment, gridMap);
        } else if (getLineSegmentOrientation(lineSegment) === 'vertical') {
            mapVerticalLineSegment(lineSegment, gridMap);
        }
    });

    return gridMap;
}

function createFullGridMap(input) {
    const gridMap = {};

    input.forEach(lineSegment => {
        if (getLineSegmentOrientation(lineSegment) === 'diagonal') {
            mapDiagonalLineSegment(lineSegment, gridMap);
        } else if (getLineSegmentOrientation(lineSegment) === 'horizontal') {
            mapHorizontalLineSegment(lineSegment, gridMap);
        } else if (getLineSegmentOrientation(lineSegment) === 'vertical') {
            mapVerticalLineSegment(lineSegment, gridMap);
        }
    });

    return gridMap;
}

function getDangerousPointsCount(gridMap) {
    let count = 0;

    Object.values(gridMap).forEach((row) => {
        Object.values(row).forEach((point) => {
            if (point > 1) {
                count++;
            }
        });
    });

    return count;
}

function part1(input) {
    const gridMap = createPartialGridMap(input);

    return getDangerousPointsCount(gridMap);
}

function part2(input) {
    const gridMap = createFullGridMap(input);

    return getDangerousPointsCount(gridMap);
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(await inputFromFile.readDay5Input(inputType)),
    partTwo: async (inputType = 'sample') => part2(await inputFromFile.readDay5Input(inputType))
};