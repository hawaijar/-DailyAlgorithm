import Cell from "./Cell";

export class Graph<T extends string | number> {
    adjacencyList: Map<T, { node: T, weight: number }[]>;
    constructor(public noOfVertices: number) {
        this.adjacencyList = new Map();
    }
    addVertex(v: T) {
        this.adjacencyList.set(v, []);
    }
    addEdge(u: T, v: T, weight: number) {
        this.adjacencyList.get(u).push({ node: v, weight });
    }
    display() {
        let keys = this.adjacencyList.keys();
        for (let vertex of keys) {
            let values = this.adjacencyList.get(vertex);
            console.log(vertex, ':', values)
        }
    }
}

let g = new Graph(4);
g.addVertex(1);
g.addVertex(2);
g.addVertex(3);
g.addVertex(4);
g.addEdge(1, 2, 3);
g.addEdge(1, 3, 4);
g.addEdge(1, 4, 1);
g.addEdge(2, 5, 5);
g.addEdge(3, 4, 7);
g.addEdge(4, 2, 1);
g.addEdge(4, 5, 1);


