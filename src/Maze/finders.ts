
import Grid from "./Grid";
import Node from "./Node";

/** 1-way Path finders */

const START_NODE = 0;
const END_NODE = 1;

function breadFirstSearch(startX: number, startY: number, endX: number, endY: number, grid: Grid) {
    let startNode = grid.getNodeAt(startX, startY);
    let endNode = grid.getNodeAt(endX, endY);
    let startOpenList: Node[] = [];
    let endOpenList: Node[] = [];

    // push the start and end nodes into the queues
    startOpenList.push(startNode);
    startNode.visited = true;
    startNode.openBy = START_NODE;
    endOpenList.push(endNode);
    endNode.visited = true;
    endNode.openBy = END_NODE;

    // while both the queues are not empty
    while (startOpenList.length && endOpenList.length) {
        // expand start open list
        let node = <Node>startOpenList.shift(); // or, startOpenList.shift()!
        let neighbours: Node[] = grid.getNeighbours(node);

        for (let neighbour of neighbours) {
            if (neighbour.visited) {
                continue;
            }
            if (neighbour === endNode) {
                console.log('FOUND!!!');
                break;
            }
            neighbour.visited = true;
            startOpenList.push(node)
        }
    }
    console.log('NOT FOUND!!!');
}

let array = [
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 1]
]

let grid: Grid = new Grid(array);
breadFirstSearch(0, 0, 3, 3, grid);