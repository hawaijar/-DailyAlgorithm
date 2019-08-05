export default class Node {
    visited?: boolean;
    openBy?: 0 | 1;
    constructor(public x: number, public y: number, public walkable = true) {
    }
}