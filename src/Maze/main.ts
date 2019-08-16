import Graph from "./Graph";
import Cell from "./Cell";
import { breadFirstSearch } from "./pathFinders"
console.log('Hello world!')

let maze = [
    [1, 2, 0, 0, 0],
    [1, 5, 1, 2, 0],
    [7, 2, 5, 0, 1],
    [9, 8, 8, 1, 2],
    [10, 10, 10, 1, 10]
];

const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];

function isValid(cell: Cell) {
    let [x, y] = [cell.x, cell.y];
    if (x >= 0 && x < ROWS && y >= 0 && y < COLS && maze[x][y] > 0) {
        return true;
    }
    return false;
}
function directions(cell: Cell) {
    let result: Cell[] = [];
    for (let direction of DIRECTIONS) {
        let neighbour = new Cell(cell.x + direction[0], cell.y + direction[1]);
        if (isValid(neighbour)) {
            result.push(neighbour);
        }
    }
    return result;
}

/** initialization of the graph(V,E) */
const ROWS = maze.length;
const COLS = maze[0].length;
const noOfVertices = ROWS * COLS;
let graph = new Graph<Cell>(noOfVertices);
/** Add the vertices */
for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
        let cell = new Cell(i, j);
        graph.addVertex(cell);
        let neighbours = directions(cell);
        /** init the adjacency list */
        for (let neighbour of neighbours) {
            graph.addEdge(cell, neighbour, maze[neighbour.x][neighbour.y])
        }
    }
}

breadFirstSearch(graph, [0, 0], [4, 4])



