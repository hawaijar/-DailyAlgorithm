export default class Cell {
    parent?: Cell | null;
    visited?: boolean;
    openBy?: 0 | 1;
    constructor(public _x: number, public _y: number, public walkable = true) {
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
}
