import Graph from "./Graph";
import Cell from "./Cell";
import { breadFirstSearch } from "./pathFinders"
let maze = [
    [1, 2, 0, 0, 0],
    [0, 5, 1, 2, 0],
    [7, 0, 5, 1, 1],
    [9, 8, 0, 0, 2],
    [0, 0, 0, 0, 10]
];

const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const ROWS = maze.length;
const COLS = maze[0].length;
const noOfVertices = ROWS * COLS;

function directions(cell: Cell) {
    let result: Cell[] = [];
    for (let direction of DIRECTIONS) {
        let [x, y] = [cell.x + direction[0], cell.y + direction[1]];
        /** Check if there's any vertex having this [x,y] co-ordinate */
        let xy = `${x},${y}`;
        if (xy in hashXYToVertex) {
            result.push(hashXYToVertex[xy]);
        }
    }
    return result;
}

/** initialization of the graph(V,E) */
let graph = new Graph<Cell>(noOfVertices);
let hashXYToVertex: { [index: string]: Cell } = {};
/** Add the vertices */
for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
        let cell = new Cell(i, j);
        if (maze[i][j] === 0) {
            continue;
        }
        graph.addVertex(cell);
        let xy = `${cell.x},${cell.y}`;
        hashXYToVertex[xy] = cell;
    }
}
let vertices = graph.adjacencyList.keys();
for (let vertex of vertices) {
    let neighbours = directions(vertex);
    /** init the adjacency list */
    for (let neighbour of neighbours) {
        // [vertex] => [(vertex1, weight), (vertex2, weight), ... (vertexN, weight)]
        graph.addEdge(vertex, neighbour, maze[neighbour.x][neighbour.y])
    }
}

window.maze = maze;
window.bfs = breadFirstSearch(graph, [0, 0], [4, 4])



