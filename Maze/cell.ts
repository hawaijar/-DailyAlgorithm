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