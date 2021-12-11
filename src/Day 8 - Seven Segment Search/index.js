const inputFromFile = require('../../inputFromFile');

function deduceProbableNumbers(signal) {
    if (signal.length === 2) return [1];
    if (signal.length === 3) return [7];
    if (signal.length === 4) return [4];
    if (signal.length === 7) return [8];
    if (signal.length === 5) return [2, 3, 5];
    if (signal.length === 6) return [0, 6, 9];
}

function interpretOutputValueViaLength(outputValueSignals) {
    let signalInterpreted = true;
    let signalValue = '';

    for (let i = 0; i < outputValueSignals.length; i++) {
        const outputValueSignal = outputValueSignals[i];

        const probableNumber = deduceProbableNumbers(outputValueSignal);

        if (probableNumber.length !== 1) {
            signalInterpreted = false;
            signalValue = '';
            break;
        }

        signalValue += probableNumber;
    }

    if (signalInterpreted) {
        return +signalValue;
    }

    return false;
}

function createConnectionSegmentMap(signalPatterns) {
    signalPatterns.sort((a, b) => a.length - b.length);

    const segmentConnectionsMap = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
    };

    signal1Connections = signalPatterns[0].split('');
    segmentConnectionsMap[3] = signal1Connections;
    segmentConnectionsMap[6] = signal1Connections;

    signal7Connections = signalPatterns[1].split('');
    segmentConnectionsMap[1] = signal7Connections.filter(connection => !signal1Connections.includes(connection));

    signal4Connections = signalPatterns[2].split('');
    filteredSignal4Connections = signal4Connections.filter(connection => !signal1Connections.includes(connection));
    segmentConnectionsMap[2] = filteredSignal4Connections;
    segmentConnectionsMap[4] = filteredSignal4Connections;

    signal8Connections = signalPatterns[9].split('');
    filteredSignal8Connections = signal8Connections.filter(connection => !signal1Connections.includes(connection) && !signal7Connections.includes(connection) && !signal4Connections.includes(connection));
    segmentConnectionsMap[5] = filteredSignal8Connections;
    segmentConnectionsMap[7] = filteredSignal8Connections;

    for (let i = 3; i <= 4; i++) {
        signalIConnections = signalPatterns[i].split('');

        if (signalIConnections.filter(connection => (new Set([...segmentConnectionsMap[2], ...segmentConnectionsMap[4]])).has(connection)).length === 2) {
            // 5
            segmentConnectionsMap[6] = signalIConnections.filter(connection => segmentConnectionsMap[6].includes(connection));
            segmentConnectionsMap[3] = segmentConnectionsMap[3].filter(connection => !segmentConnectionsMap[6].includes(connection));

            segmentConnectionsMap[7] = signalIConnections.filter(connection => segmentConnectionsMap[7].includes(connection));
            segmentConnectionsMap[5] = segmentConnectionsMap[5].filter(connection => !segmentConnectionsMap[7].includes(connection));
        } else if (signalIConnections.filter(connection => (new Set([...segmentConnectionsMap[3], ...segmentConnectionsMap[6]])).has(connection)).length === 2) {
            // 3
            segmentConnectionsMap[4] = signalIConnections.filter(connection => segmentConnectionsMap[4].includes(connection));
            segmentConnectionsMap[2] = segmentConnectionsMap[2].filter(connection => !segmentConnectionsMap[4].includes(connection));

            segmentConnectionsMap[7] = signalIConnections.filter(connection => segmentConnectionsMap[7].includes(connection));
            segmentConnectionsMap[5] = segmentConnectionsMap[5].filter(connection => !segmentConnectionsMap[7].includes(connection));
        } else if (signalIConnections.filter(connection => (new Set([...segmentConnectionsMap[5], ...segmentConnectionsMap[7]])).has(connection)).length === 2) {
            // 2
            segmentConnectionsMap[3] = signalIConnections.filter(connection => segmentConnectionsMap[3].includes(connection));
            segmentConnectionsMap[6] = segmentConnectionsMap[6].filter(connection => !segmentConnectionsMap[3].includes(connection));

            segmentConnectionsMap[4] = signalIConnections.filter(connection => segmentConnectionsMap[4].includes(connection));
            segmentConnectionsMap[2] = segmentConnectionsMap[2].filter(connection => !segmentConnectionsMap[4].includes(connection));
        }
    }

    connectionSegmentMap = {};

    Object.entries(segmentConnectionsMap).forEach(([key, value]) => connectionSegmentMap[value[0]] = +key);

    return connectionSegmentMap;
}

function deduceNumber(outputValueSignal, connectionSegmentMap) {
    digitSegmentsMap = [
        [1, 2, 3, 5, 6, 7],
        [3, 6],
        [1, 3, 4, 5, 7],
        [1, 3, 4, 6, 7],
        [2, 3, 4, 6],
        [1, 2, 4, 6, 7],
        [1, 2, 4, 5, 6, 7],
        [1, 3, 6],
        [1, 2, 3, 4, 5, 6, 7],
        [1, 2, 3, 4, 6, 7],
    ];

    const outputValueConnections = outputValueSignal.split('');
    const outputValueSegments = [];
    Object.entries(connectionSegmentMap).forEach(([connection, segment]) => {
        if (outputValueConnections.includes(connection)) {
            outputValueSegments.push(segment);
        }
    });

    for (let i = 0; i < digitSegmentsMap.length; i++) {
        if (JSON.stringify(digitSegmentsMap[i]) === JSON.stringify(outputValueSegments)) {
            return i;
        }
    }

    return NaN;
}

function interpretOutputValueViaSegmentConnectionMap(outputValueSignals, connectionSegmentMap) {
    let signalValue = '';

    outputValueSignals.forEach(outputValueSignal => {
        signalValue += deduceNumber(outputValueSignal, connectionSegmentMap);
    });

    return +signalValue;
}

function interpretSignal(signal) {
    const interpretedOutputValueViaLength = interpretOutputValueViaLength(signal.outputValueSignals);
    if (interpretedOutputValueViaLength) {
        return interpretedOutputValueViaLength;
    }

    const connectionSegmentMap = createConnectionSegmentMap(signal.signalPatterns);

    return interpretOutputValueViaSegmentConnectionMap(signal.outputValueSignals, connectionSegmentMap);
}

function part1(input) {
    let count = 0;

    input.forEach(signal => {
        signal.outputValueSignals.forEach(outputValueSignal => {
            if (deduceProbableNumbers(outputValueSignal).length === 1) count++;
        });
    });

    return count;
}

function part2(input) {
    let sum = 0;
    input.forEach(signal => {
        sum += interpretSignal(signal);
    });

    return sum;
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(await inputFromFile.readDay8Input(inputType)),
    partTwo: async (inputType = 'sample') => part2(await inputFromFile.readDay8Input(inputType))
};