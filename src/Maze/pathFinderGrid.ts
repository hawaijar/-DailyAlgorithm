interface Position {
    x: number
    y: number
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
                    y: j
                })
            }
        }
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
            let neighbour: Position = {
                x: node.x + direction[0],
                y: node.y + direction[1]
            }
            if (neighbour.x >= 0 && neighbour.x < this.ROWS &&
                neighbour.y >= 0 && neighbour.y < this.COLS) {
                result.push(neighbour)
            }
        }
        return result;
    }

}