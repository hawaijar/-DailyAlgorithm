export class PQElement<T> {
    constructor(public data: T, public priority: number) { }
}

export default class PriorityQueue<T> {
    container: PQElement<T>[] = [];
    constructor(public size: number, public isMin: boolean = true) { }

    isEmpty() {
        return this.container.length === 0;
    }
    isFull() {
        return this.container.length > this.size;
    }

    enQueue(data: T, priority: number) {
        /** Higher priority (greater value) at the end */
        let found = false;
        let element = new PQElement(data, priority);
        if (this.isFull()) {
            console.log("Queue full");
        }
        else {
            for (let i = 0; i < this.container.length; i++) {
                if (
                    this.isMin ?
                        priority >= this.container[i].priority :
                        priority <= this.container[i].priority) {
                    this.container.splice(i, 0, element);
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.container.push(element);
            }
        }
    }
    dequeue(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        else {
            return this.container.pop()!.data;
        }
    }
    getElement(data: T): T | null | undefined {
        if (this.isEmpty) {
            return null;
        }
        for (let i = 0; i < this.container.length; i++) {
            let element = this.container[i];
            if (element.data === data) {
                return data;
            }
        }
        return null;
    }
    updatePriority(node: T, priority: number): void {
        // find the node first
        for (let i = 0; i < this.container.length; i++) {
            if (this.container[i].data === node) {
                // remove the element
                this.container.splice(i, 1);
                // add again to the Queue
                this.enQueue(node, priority);
                break;
            }
        }
    }
    display() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
        }
        else {
            for (let i = this.container.length - 1; i >= 0; i--) {
                let element = this.container[i];
                console.log({ data: element.data, priority: element.priority })
            }
        }
    }
}

/** Testing Priority Queue */
// let pq = new PriorityQueue(5, false);
// pq.enQueue(2, 3);
// pq.enQueue(100, 2);
// pq.enQueue(90, 1);
// pq.enQueue(20, -1);

// pq.display();



