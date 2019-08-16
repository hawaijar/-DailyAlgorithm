import Graph from "./Graph";
import Cell from "./Cell";

export function breadFirstSearch(graph: Graph<Cell>, s: [number, number], d: [number, number]) {
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
        console.log(current);
        if (current === destination) {
            break;
        }
        current.visited = true;
        let neighbours = graph.getNeighbours(current)!;
        console.log(neighbours);
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
    let current = destination;
    while (current) {
        console.log(`[${current.x}][${current.y}]`);
        current = current.parent!;
    }
}