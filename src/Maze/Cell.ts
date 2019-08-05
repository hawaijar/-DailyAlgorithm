export default class Cell {
    parent?: Cell | null;
    visited?: boolean;
    openBy?: 0 | 1;
    constructor(public x: number, public y: number, public walkable = true) {
    }
}
