import Graph from "./Graph";
import Cell from "./Cell";
import pQueue from "./PriorityQueue";

function findHeurusticDistanceManhattan(current: [number, number], goal: [number, number]) {
    /** Distance = (x2 -x1) + (y2 - y1) */
}
function findHeurusticDistanceEuclidean(current: [number, number], goal: [number, number]) {
    /** Distance = sqrt( (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) */
}

export function breathFirstSearch(graph: Graph<Cell>, s: [number, number], d: [number, number]) {
    /** Find the source/destination nodes using the co-ordinates */
    let source: Cell | null = null;
    let destination: Cell | null = null;

    if (graph.adjacencyList.size === 0) {
        return [];
    }
    let vertices = graph.adjacencyList.keys();
    for (let vertex of vertices) {
        if (vertex.x === s[0] && vertex.y === s[1]) {
            source = vertex;
        }
        if (vertex.x === d[0] && vertex.y === d[1]) {
            destination = vertex;
        }
    }

    if (source === null || destination === null) {
        return [];
    }

    let queue: Cell[] = [source];

    /** Explore all nodes till we find the destination */
    while (queue.length > 0) {
        let current = queue.pop()!;
        if (current === destination) {
            break;
        }
        current.visited = true;
        let neighbours = graph.getNeighbours(current)!;
        /** Parse all the neighbours */
        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = neighbours[i];
            if (!neighbour.node.visited) {
                neighbour.node.visited = true;
                neighbour.node.parent = current;
                queue.push(neighbour.node);
            }
        }
    }
    /** Reconstruct the path from destination to source via the 'parent' field */
    let result = [];
    let current = destination;
    while (current) {
        result.push([current.x, current.y]);
        current = current.parent!;
    }
    return result.reverse();
}
export function bestFirstSearch(graph: Graph<Cell>, s: [number, number], d: [number, number]) {
}
export function dijikstraShortestPath(graph: Graph<Cell>, s: [number, number], d: [number, number]) {
    /** Find the source/destination nodes using the co-ordinates */
    let source: Cell | null = null;
    let destination: Cell | null = null;
    let costs: Map<Cell, [number, Cell | null]> = new Map();

    if (graph.adjacencyList.size === 0) {
        return [];
    }
    let vertices = graph.adjacencyList.keys();
    for (let vertex of vertices) {
        if (vertex.x === s[0] && vertex.y === s[1]) {
            source = vertex;
        }
        if (vertex.x === d[0] && vertex.y === d[1]) {
            destination = vertex;
        }
    }

    if (source === null || destination === null) {
        return [];
    }
    /** initialize the costs */
    for (let vertex of vertices) {
        if (vertex === source) {
            costs.set(vertex, [0, null]);
        }
        else {
            costs.set(vertex, [Number.MAX_SAFE_INTEGER, null]);
        }
    }
    let priorityQueue = new pQueue(graph.adjacencyList.size);
    priorityQueue.enQueue(source, 0);
    source.visited = true;

    while (!priorityQueue.isEmpty()) {
        let current = <Cell>priorityQueue.dequeue();
        /** Find the neighbours of current */
        let neighbours = graph.getNeighbours(current);
        if (!neighbours) continue;

        for (let neighbour of neighbours) {
            /** Very important!!! */
            if (neighbour.node.visited) continue;
            neighbour.node.visited = true;

            /** Apply relaxation to each neighbour */
            let shortest = neighbour.weight + costs.get(current)![0]
            if (shortest < costs.get(neighbour.node)![0]) {
                /** Update the costs - distance & parent */
                costs.set(neighbour.node, [shortest, current]);
                /** Update the priority queue */
                priorityQueue.updatePriority(neighbour.node, shortest);
            }
        }
    }
}
