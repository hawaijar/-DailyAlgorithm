interface Position {
    x: number
    y: number,
    parent?: Position | null,
    isVisited?: boolean;
}

export class Grid {
    allNodes: Position[] = [];
    COLS: number;
    ROWS: number;

    constructor(public matrix: number[][]) {
        this.ROWS = matrix.length;
        this.COLS = matrix[0].length;
        this.init();
    }
    init() {
        /** initialize the grid */
        for (let i = 0; i < this.ROWS; i++) {
            for (let j = 0; j < this.COLS; j++) {
                this.allNodes.push({
                    x: i,
                    y: j,
                    parent: null,
                    isVisited: false
                })
            }
        }
    }

    /** get node, based on co-ordinates */
    getNode(node: Position) {
        for (let current of this.allNodes) {
            if (current.x === node.x
                && current.y === node.y
                && this.matrix[current.x][current.y]) {
                return current;
            }
        }
        return null;
    }

    /** find the neighbours of a node */
    neighbours(node: Position): Position[] | [] {
        let result: Position[] = [];
        let directions = [
            [0, -1], // North
            [0, 1], // South
            [1, 0], // East
            [-1, 0] // West
        ]
        for (let direction of directions) {
            let neighbour = this.getNode({ x: node.x + direction[0], y: node.y + direction[1] });
            if (neighbour !== null) {
                result.push(neighbour)
            }
        }
        return result;
    }

}

function breathFirstSearch(s: Position, d: Position, grid: Grid) {
    /** Explore the nodes */
    let start = grid.getNode(s);
    let queue: (Position | null)[] = [start];
    start!.isVisited = true;
    while (queue.length) {
        let current = queue.pop()!;
        if (current.x === d.x && current.y === d.y) {
            /** Found the goal! */
            break;
        }
        let neighbours = grid.neighbours(current);
        for (let neighbour of neighbours) {
            if (!neighbour.isVisited) {
                neighbour.parent = current;
                neighbour.isVisited = true;
                queue.push(neighbour);
            }
        }
    }

    /** Reconstruct the path */
    let current = grid.getNode(d);
    while (current) {
        console.log(`[${current.x}][${current.y}]`);
        current = current.parent!;
    }
}

let maze = [
    [1, 2, 3, 4, 5],
    [2, 1, 0, 0, 0],
    [1, 4, 1, 1, 0],
    [1, 1, 0, 1, 1],
    [3, 4, 5, 1, 1]
];

let grid = new Grid(maze);
breathFirstSearch({ x: 0, y: 0 }, { x: 4, y: 4 }, grid);