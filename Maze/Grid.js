import Node from "./Node";

export class Grid {
  constructor(matrix) {
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
        // 0 means walkable
        // 1 means wall
        nodes[i][j] = new Node(i, j);
        if (this.matrix[i][j]) {
          node[i][j].walkable = false;
        }
      }
    }
    return nodes;
  }
  getNodeAt(x, y) {
    return this.nodes[x][y];
  }
  isWalkableAt(x, y) {
    return this.isInsideTheGrid(x, y) && node[x][y].walkable;
  }
  isInsideTheGrid(x, y) {
    return x >= 0 && x <= this.width && (y >= 0 && y <= this.height);
  }
  setWalkableAt(x, y) {
    this.nodes[x][y].walkable = true;
  }
  getNeighbours(node) {
    let [x, y] = [node.x, node.y];
    let neigbours = [];
    // check North: ↑
    if (this.walkable(x, y - 1)) neigbours.push(nodes[x][y - 1]);
    // check South: ↓
    if (this.walkable(x, y + 1)) neigbours.push(nodes[x][y + 1]);
    // check West: ←
    if (this.walkable(x - 1, y)) neigbours.push(nodes[x - 1][y]);
    // check East: →
    if (this.walkable(x + 1, y)) neigbours.push(nodes[x + 1][y]);

    return neigbours;
  }
}
