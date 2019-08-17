import PriorityQueue, { PQElement } from "./PriorityQueue";

export default class Graph<T> {
    adjacencyList: Map<T, { node: T, weight: number }[]>;
    constructor(public noOfVertices: number) {
        this.adjacencyList = new Map();
    }
    addVertex(v: T) {
        this.adjacencyList.set(v, []);
    }
    addEdge(u: T, v: T, weight: number) {
        if (this.adjacencyList.has(u)) {
            this.adjacencyList.get(u)!.push({ node: v, weight })
        }
    }
    getNeighbours(node: T) {
        if (this.adjacencyList.size > 0) {
            if (this.adjacencyList.has(node)) {
                return this.adjacencyList.get(node);
            }
        }
        return [];
    }

    display() {
        let keys = this.adjacencyList.keys();
        for (let vertex of keys) {
            let values = this.adjacencyList.get(vertex);
            console.log(vertex, ':', values)
        }
    }
}

function dijikstraShortestPath<T extends string | number>(graph: Graph<T>, source: T, destination: T) {
    let updatedDistancesFromSource: Map<T, { weight: number, parent: T | null }> = new Map();
    let pQueue = new PriorityQueue<T>(graph.adjacencyList.size);

    /** Update all distances, except source, from source to be Infinity */
    for (let key of graph.adjacencyList.keys()) {
        if (key === source) {
            pQueue.enQueue(key, 0);
            updatedDistancesFromSource.set(key, { weight: 0, parent: null });
        }
        else {
            updatedDistancesFromSource.set(key, { weight: Number.MAX_SAFE_INTEGER, parent: null })
            pQueue.enQueue(key, Number.MAX_SAFE_INTEGER);
        }
    }
    while (!pQueue.isEmpty()) {
        let parent: T = pQueue.dequeue()!;
        /** get the neighbours */
        let parentWeight = updatedDistancesFromSource.get(parent)!.weight;
        let neighbours = graph.adjacencyList.get(parent);
        /** apply relaxation to each neighbour */
        for (let neighbour of neighbours!) {
            let { node, weight } = neighbour;
            if (parentWeight + weight < updatedDistancesFromSource.get(node)!.weight) {
                updatedDistancesFromSource.set(node, { weight: parentWeight + weight, parent });
                pQueue.updatePriority(node, parentWeight + weight);
            }
        }
    }
    console.log(updatedDistancesFromSource)

}

// let g = new Graph<number>(4);
// g.addVertex(1);
// g.addVertex(2);
// g.addVertex(3);
// g.addVertex(4);
// g.addVertex(5);
// g.addEdge(1, 2, 3);
// g.addEdge(1, 3, 4);
// g.addEdge(1, 4, 1);
// g.addEdge(2, 5, 5);
// g.addEdge(3, 4, 7);
// g.addEdge(4, 2, 1);
// g.addEdge(4, 5, 1);
// g.addEdge(5, 5, 0);

// dijikstraShortestPath(g, 1, 5);


