import Grid from "./Grid";
import Cell from "./Cell";

/** 1-way Path finders */
const START_NODE = 0;
const END_NODE = 1;

function breadFirstSearch(startX: number, startY: number, endX: number, endY: number, grid: Grid) {
    let foundNode: boolean = false;
    let startNode = grid.getNodeAt(startX, startY);
    let endNode = grid.getNodeAt(endX, endY);
    let startOpenList: Cell[] = [];
    let endOpenList: Cell[] = [];
    let parents: Cell[] = [];

    // push the start and end nodes into the queues
    startOpenList.push(startNode);
    startNode.visited = true;
    startNode.openBy = START_NODE;
    startNode.parent = null;
    //endOpenList.push(endNode);
    //endNode.visited = true;
    //endNode.openBy = END_NODE;

    // while both the queues are not empty
    while (startOpenList.length) {
        // expand start open list
        let node = <Cell>startOpenList.shift(); // or, startOpenList.shift()!
        let neighbours: Cell[] = grid.getNeighbours(node);

        for (let neighbour of neighbours) {
            if (neighbour.visited) {
                continue;
            }
            if (neighbour === endNode) {
                neighbour.parent = node;
                reconstructPath(endNode);
                foundNode = true;
                break;
            }
            neighbour.visited = true;
            neighbour.parent = node;
            startOpenList.push(neighbour)
        }
    }
    if (foundNode) {
        console.log("FOUND NODE!!!");
    }
    else {
        console.log('NOT FOUND!!!');
    }
}
function reconstructPath(node: Cell | null | undefined) {
    while (node) {
        console.log(`[${node.x}][${node.y}]`);
        node = node.parent;
    }
}


function findConnectedComponents(grid: Grid): number {
    let count = 0;
    for (let i = 0; i < grid.height; i++) {
        for (let j = 0; j < grid.width; j++) {
            if (!grid.isWalkableAt(i, j)) continue;
            let cell: Cell = grid.getNodeAt(i, j);

            if (cell.visited) continue;
            count += 1;
            let queue: Cell[] = [cell];
            cell.visited = true;
            while (queue.length) {
                let node = queue.pop()!;
                let neighbours = grid.getNeighbours(node);
                for (let neighbour of neighbours) {
                    if (neighbour.visited) continue;
                    neighbour.visited = true;
                    queue.push(neighbour);
                }
            }
        }
    }
    return count;
}

let array = [
    [1, 1, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 0],
    [0, 1, 1, 1]
]

let grid: Grid = new Grid(array);
//breadFirstSearch(0, 0, 3, 3, grid);
/** comment bfs to run below function as it modifies the Grid! */
let connectedComponents = findConnectedComponents(grid);
console.log(connectedComponents);
