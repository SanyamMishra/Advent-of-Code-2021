const path = require('path');
const fs = require('fs/promises');

async function readAsArray(inputType, separator = ',') {
    const fileData = await fs.readFile(
        path.join(__dirname, 'src', dayChosen, `input.${inputType}.txt`),
        { encoding: 'utf8' }
    );

    return fileData.split(separator);
}

async function readAsArrayOfNumbers(inputType, separator = ',') {
    return (await readAsArray(inputType, separator)).map(element => +element);
}

async function readAsGrid(inputType, rowSeparator = '\r\n', columnSeparator = '') {
    const fileData = await fs.readFile(
        path.join(__dirname, 'src', dayChosen, `input.${inputType}.txt`),
        { encoding: 'utf8' }
    );

    return fileData.split(rowSeparator).map(row => row.split(columnSeparator));
}

async function readAsGridOfNumbers(inputType, rowSeparator = '\r\n', columnSeparator = '') {
    return (await readAsGrid(inputType, rowSeparator, columnSeparator))
        .map(row => row.map(element => +element));
}

async function readDay4Input(inputType) {
    let fileData = await fs.readFile(
        path.join(__dirname, 'src', dayChosen, `input.${inputType}.txt`),
        { encoding: 'utf8' }
    );

    fileData = fileData.split('\r\n\r\n');

    const numberToDraw = fileData[0].split(',').map(number => +number);

    const boards = [];

    for (let i = 1; i < fileData.length; i++) {
        boards.push(fileData[i].split('\r\n').map(row => row.split(/(\d+)/).filter(item => !isNaN(parseInt(item)))));
    }

    return {
        numberToDraw,
        boards
    };
}

async function readDay5Input(inputType) {
    let fileData = await fs.readFile(
        path.join(__dirname, 'src', dayChosen, `input.${inputType}.txt`),
        { encoding: 'utf8' }
    );

    return fileData.split('\r\n')
        .map(row => row.split(' -> '))
        .map(row => {
            const from = row[0].split(',');
            const to = row[1].split(',');
            return {
                from: {
                    x: +from[0],
                    y: +from[1]
                },
                to: {
                    x: +to[0],
                    y: +to[1]
                }
            };
        });
}

async function readDay8Input(inputType) {
    let fileData = await fs.readFile(
        path.join(__dirname, 'src', dayChosen, `input.${inputType}.txt`),
        { encoding: 'utf8' }
    );

    return fileData.split('\r\n')
        .map(data => data.split(' | '))
        .map(data => ({
            'signalPatterns': data[0].split(' '),
            'outputValueSignals': data[1].split(' ')
        }));
}

async function readDay12Input(inputType) {
    let fileData = await fs.readFile(
        path.join(__dirname, 'src', dayChosen, `input.${inputType}.txt`),
        { encoding: 'utf8' }
    );

    return fileData.split('\r\n')
        .reduce((prev, curr) => {
            const edge = curr.split('-');

            if (edge[0] !== 'end' && edge[1] !== 'start') {
                if (prev[edge[0]]) {
                    prev[edge[0]].push(edge[1]);
                } else {
                    prev[edge[0]] = [edge[1]];
                }
            }

            if (edge[1] !== 'end' && edge[0] !== 'start') {
                if (prev[edge[1]]) {
                    prev[edge[1]].push(edge[0]);
                } else {
                    prev[edge[1]] = [edge[0]];
                }
            }

            return prev;
        }, {});
}

async function readDay13Input(inputType) {
    let fileData = await fs.readFile(
        path.join(__dirname, 'src', dayChosen, `input.${inputType}.txt`),
        { encoding: 'utf8' }
    );

    const [dotsData, foldData] = fileData.split('\r\n\r\n')
        .map(data => data.split('\r\n'));

    const dotsMap = {};

    dotsData.map(data => data.split(',')).forEach(dot => {
        const x = dot[0];
        const y = dot[1];

        if (dotsMap[x] === undefined) {
            dotsMap[x] = {};
        }

        dotsMap[x][y] = '#';
    });

    const foldInstructions = foldData.map(data => {
        const [, axis, lineNumber] = data.match(/fold along (x|y)=(\d+)/);
        return {
            axis,
            lineNumber
        };
    });

    return [dotsMap, foldInstructions];
}

async function readDay14Input(inputType) {
    let fileData = await fs.readFile(
        path.join(__dirname, 'src', dayChosen, `input.${inputType}.txt`),
        { encoding: 'utf8' }
    );

    const [polymerTemplateData, pairInsertionRulesData] = fileData.split('\r\n\r\n');

    const pairInsertionRulesMap = {};

    pairInsertionRulesData.split('\r\n')
        .forEach(pairInsertionRuleData => {
            const matchData = pairInsertionRuleData.match(/([A-Z][A-Z]) -> ([A-Z])/);

            pairInsertionRulesMap[matchData[1]] = matchData[2];
        });

    const pairInsertionRulesFrequency = Object.fromEntries(Object.keys(pairInsertionRulesMap).map(rule => [rule, 0]));

    for (let i = 1; i < polymerTemplateData.length; i++) {
        pairInsertionRulesFrequency[`${polymerTemplateData[i - 1]}${polymerTemplateData[i]}`]++;
    }

    return [pairInsertionRulesMap, pairInsertionRulesFrequency];
}

module.exports = {
    readAsArray,
    readAsArrayOfNumbers,
    readAsGrid,
    readAsGridOfNumbers,
    readDay4Input,
    readDay5Input,
    readDay8Input,
    readDay12Input,
    readDay13Input,
    readDay14Input
};