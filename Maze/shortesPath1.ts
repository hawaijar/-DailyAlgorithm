type Link = Map<Cell, boolean>

class Cell {
    row: number;
    column: number;
    links: Link;
    north: Cell | null;
    south: Cell | null;
    east: Cell | null;
    west: Cell | null;
    constructor(col: number, row: number) {
        this.row = row;
        this.column = col;
        this.links = new Map();
        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;
    }
    link(cell: Cell) {
        this.links.set(cell, true);
    }
    unlink(cell: Cell) {
        this.links.set(cell, false);
    }
    isLinked(cell: Cell): boolean {
        return this.links.has(cell);
    }
    neighbours(): Cell[] {
        let list: Cell[] = [];
        if (this.north) list.push(this.north);
        if (this.south) list.push(this.south);
        if (this.east) list.push(this.east);
        if (this.west) list.push(this.west);

        return list;
    }
}

class Node {
    /**
     * 
     * @param x [x-coordinate of the point]
     * @param y [y-coordinate of the point]
     * @param distance [distance from the source to this node]
     */
    constructor(public x: number, public y: number, public distance: number) { }
}

type direction = {
    [name: string]: number[]
}

// NORTH(x,y) => [x, y - 1]
let NORTH = (cordinate: Cordinate): Cordinate => (
    {
        x: cordinate.x,
        y: cordinate.y - 1
    }
)
let SOUTH = (cordinate: Cordinate): Cordinate => (
    {
        x: cordinate.x,
        y: cordinate.y + 1
    }
)
let EAST = (cordinate: Cordinate): Cordinate => (
    {
        x: cordinate.x - 1,
        y: cordinate.y
    }
)
let WEST = (cordinate: Cordinate): Cordinate => (
    {
        x: cordinate.x + 1,
        y: cordinate.y
    }
)


interface Array2D {
    [index: number]: number[]
}
interface Cordinate {
    x: number
    y: number
}

class Grid {
    visited: Array2D = [];
    /**
     * 
     * @param ROWS [Rows of the grid]
     * @param COLUMNS [Columns of the grid]
     */
    constructor(public ROWS: number, public COLUMNS: number) {
        for (let i = 0; i < ROWS; i++) {
            this.visited[i] = Array(COLUMNS).fill(0);
        }
    }

    isValid(coordinate: Cordinate, maze: number[][], visited: Array2D): boolean {
        if (
            coordinate.x >= 0 &&
            coordinate.x < this.ROWS &&
            coordinate.y >= 0 &&
            coordinate.y < this.COLUMNS &&
            maze[coordinate.x][coordinate.y] &&
            visited[coordinate.x][coordinate.y]
        ) {
            return true;
        }
        return false;
    }

    breadthFirstSearch(maze: number[][], source: Cordinate, destination: Cordinate): number {
        let minimum: number = Number.POSITIVE_INFINITY;
        let queue: Node[] = [];
        this.visited[source.x][source.y] = 1;
        queue.push(new Node(source.x, source.y, 0))

        while (queue.length) {
            let node: Node | undefined = queue.pop();
            if (node) {
                let [x, y, distance] = [node.x, node.y, node.distance];
                if (x === destination.x && y === destination.y) {
                    minimum = distance;
                    break;
                }
                // check all the FOUR directions
                let north = NORTH(source);
                if (this.isValid(north, maze, this.visited)) {
                    this.visited[north.x][north.y] = 1;
                    queue.push(new Node(north.x, north.y, distance + 1));
                }
                let south = SOUTH(source);
                if (this.isValid(south, maze, this.visited)) {
                    this.visited[south.x][south.y] = 1;
                    queue.push(new Node(south.x, south.y, distance + 1));
                }
                let east = EAST(source);
                if (this.isValid(east, maze, this.visited)) {
                    this.visited[east.x][east.y] = 1;
                    queue.push(new Node(east.x, east.y, distance + 1));
                }
                let west = WEST(source);
                if (this.isValid(west, maze, this.visited)) {
                    this.visited[west.x][west.y] = 1;
                    queue.push(new Node(west.x, west.y, distance + 1));
                }
                else {
                    break;
                }
            }

            return minimum;
        }
    }
}