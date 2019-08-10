class PQElement {
    constructor(public data: string | number, public priority: number) { }
}

export default class PriorityQueue<T extends string | number> {
    container: PQElement[] = [];
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
                        priority <= this.container[i].priority :
                        priority >= this.container[i].priority) {
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
    dequeue(): PQElement | void {
        if (this.isEmpty()) {
            console.log("Queue is empty")
        }
        else {
            return this.container.pop();
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

/*
let pq = new PriorityQueue(5, false);
pq.enQueue(5, 3);
pq.enQueue(10, 2);
pq.enQueue(20, 1);
pq.enQueue(2, 10);

pq.display();
*/
