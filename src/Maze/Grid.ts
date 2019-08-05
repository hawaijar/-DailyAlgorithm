import Cell from "./Cell"

export default class Grid {
  height: number;
  width: number;
  matrix: number[][];
  nodes: Cell[][];
  constructor(matrix: number[][]) {
    this.height = matrix.length;
    this.width = matrix[0].length;
    this.matrix = matrix;
    this.nodes = this.init();
  }
  init() {
    let nodes = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      nodes[i] = new Array(this.width);
      for (let j = 0; j < this.width; j++) {
        // 1 means walkable and 0 wall
        nodes[i][j] = new Cell(i, j);
        if (this.matrix[i][j]) {
          nodes[i][j].walkable = true;
        } else {
          nodes[i][j].walkable = false;
        }
      }
    }
    return nodes;
  }
  getNodeAt(x: number, y: number) {
    return this.nodes[x][y];
  }
  isWalkableAt(x: number, y: number) {
    return this.isInsideTheGrid(x, y) && this.nodes[x][y].walkable;
  }
  isInsideTheGrid(x: number, y: number) {
    return x >= 0 && x < this.width && (y >= 0 && y < this.height);
  }
  setWalkableAt(x: number, y: number) {
    this.nodes[x][y].walkable = true;
  }
  getNeighbours(node: Cell) {
    let [x, y] = [node.x, node.y];
    let neigbours = [];
    // check North: ↑
    if (this.isWalkableAt(x, y - 1)) neigbours.push(this.nodes[x][y - 1]);
    // check South: ↓
    if (this.isWalkableAt(x, y + 1)) neigbours.push(this.nodes[x][y + 1]);
    // check West: ←
    if (this.isWalkableAt(x - 1, y)) neigbours.push(this.nodes[x - 1][y]);
    // check East: →
    if (this.isWalkableAt(x + 1, y)) neigbours.push(this.nodes[x + 1][y]);

    return neigbours;
  }
}
