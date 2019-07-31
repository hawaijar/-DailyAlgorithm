class Node {
    parent: Node | null;
    neighbours: Node[] = [];
    visited = false;
    constructor(public x: number, public y: number, public value: number) {
        this.parent = null;
    }
}
export class Grid {
    nodes: Node[][];
    rows: number;
    columns: number;
    constructor(public array: number[][]) {
        this.rows = array.length;
        this.columns = array[0].length;
        this.nodes = Array(this.rows).fill(null);
        for (let i = 0; i < this.rows; i++) {
            this.nodes[i] = Array(this.columns).fill(null);
            for (let j = 0; j < this.columns; j++) {
                this.nodes[i][j] = new Node(i, j, array[i][j])
            }
        }
    }
    isValid(x: number, y: number) {
        if ((x >= 0 && x <= this.rows) && (y >= 0 && y <= this.columns)) {
            if (this.array[x][y] && this.nodes && !this.nodes[x][y].visited)
                return true;
        }
        return false;
    }

    findNeighbours(node: Node) {
        let neighbours: Node[] = [];
        let [x, y] = [node.x, node.y];
        if (this.isValid(x, y - 1)) neighbours.push(new Node(x, y - 1, this.array[x][y - 1]))
        if (this.isValid(x, y + 1)) neighbours.push(new Node(x, y + 1, this.array[x][y + 1]))
        if (this.isValid(x - 1, y)) neighbours.push(new Node(x - 1, y, this.array[x - 1][y]))
        if (this.isValid(x + 1, y)) neighbours.push(new Node(x + 1, y, this.array[x + 1][y]))
    }

    bfsPath(sx: number, sy: number, dx: number, dy: number) {
        let source = this.nodes[sx][sy];
        let queue: Node[] = [source];
        source.visited = true;

        while (queue.length) {
            let node = queue.shift();
            if (node) {
                let neighbours = this.findNeighbours(node);
            }

        }
    }


    print() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                console.log(this.nodes[i][j])
            }
        }
    }
}

const array = [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 1]
]

let grid = new Grid(array);
grid.print();