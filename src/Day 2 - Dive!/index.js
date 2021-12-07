const inputFromFile = require('../../inputFromFile');

function part1(input) {
    const position = {
        x: 0,
        y: 0
    };

    for (let i = 0; i < input.length; i++) {
        const [, action, amount] = input[i].match(/(forward|up|down) (\d+)/);
        if (action === 'forward') {
            position.x += +amount;
        } else if (action === 'up') {
            position.y -= +amount;
        } else if (action === 'down') {
            position.y += +amount;
        }
    }

    return position.x * position.y;
}

function part2(input) {
    const position = {
        x: 0,
        y: 0,
        aim: 0
    };

    for (let i = 0; i < input.length; i++) {
        const [, action, amount] = input[i].match(/(forward|up|down) (\d+)/);
        if (action === 'forward') {
            position.x += +amount;
            position.y += position.aim * +amount;
        } else if (action === 'up') {
            position.aim -= +amount;
        } else if (action === 'down') {
            position.aim += +amount;
        }
    }

    return position.x * position.y;
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(await inputFromFile.readAsArray(inputType, '\r\n')),
    partTwo: async (inputType = 'sample') => part2(await inputFromFile.readAsArray(inputType, '\r\n'))
};