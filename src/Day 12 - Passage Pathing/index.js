const inputFromFile = require('../../inputFromFile');

function part1(edges) {
    const paths = [];
    const queue = edges.start.map(node => {
        return {
            path: ['start', node],
            visited: Object.fromEntries([...Object.keys(edges).map(node => [node, node === 'start' ? 1 : 0]), ['end', 0]])
        }
    });

    while (queue.length) {
        const {
            path,
            visited
        } = queue.shift();

        const pathLastNode = path.at(-1);

        visited[pathLastNode]++;

        if (pathLastNode === 'end') {
            paths.push(path);
            continue;
        }

        for (let node of edges[pathLastNode]) {
            if (node === node.toUpperCase() || visited[node] === 0) {
                queue.push({
                    path: [...path, node],
                    visited: { ...visited }
                });
            }
        }
    }

    return paths.length;
}

function part2(edges) {
    const paths = [];
    const queue = edges.start.map(node => {
        return {
            path: ['start', node],
            visited: Object.fromEntries([...Object.keys(edges).map(node => [node, node === 'start' ? 1 : 0]), ['end', 0]]),
            isSmallNodeVisitedAlready: false
        }
    });

    while (queue.length) {
        const {
            path,
            visited,
            isSmallNodeVisitedAlready
        } = queue.shift();

        const pathLastNode = path.at(-1);

        visited[pathLastNode]++;

        if (pathLastNode === 'end') {
            paths.push(path);
            continue;
        }

        for (let node of edges[pathLastNode]) {
            if (node === node.toUpperCase() || visited[node] === 0 || (visited[node] === 1 && !isSmallNodeVisitedAlready)) {
                queue.push({
                    path: [...path, node],
                    visited: { ...visited },
                    isSmallNodeVisitedAlready: isSmallNodeVisitedAlready || (node === node.toLowerCase() && visited[node] === 1)
                });
            }
        }
    }

    return paths.length;
}

module.exports = {
    partOne: async (inputType = 'sample') => part1(await inputFromFile.readDay12Input(inputType, '\r\n')),
    partTwo: async (inputType = 'sample') => part2(await inputFromFile.readDay12Input(inputType, '\r\n'))
};