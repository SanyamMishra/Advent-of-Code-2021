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

module.exports = {
    readAsArray,
    readAsArrayOfNumbers,
    readDay4Input,
    readDay5Input,
    readDay8Input
};