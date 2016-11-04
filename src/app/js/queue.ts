import * as React from 'react';
import * as ReactDOM from 'react-dom';
export class Queue<T> {
    private list: T[];

    constructor(baseList?: T[]) {
        this.list = baseList || [];
    }

    /**
     * Inserts the specified element into the end of this queue.
     */
    enqueue(elem: T) {
        this.list[this.list.length] = elem;
    }

    /**
     * Remove the head element of this queue.
     */
    dequeue(): T {
        return this.list.splice(0, 1)[0];
    }

    /**
     * Iterate over the array from head to end
     */
    forEach(callback: (value: T) => void) {
        for (let i = this.list.length - 1; i >= 0; i--) {
            callback(this.list[i]);
        }
    }

    /**
     * Map the array
     */
    map(callback: (value: T) => any) {
        const toReturn = [];
        this.forEach(value => { toReturn[toReturn.length] = callback(value) });
        return toReturn;
    }

    /**
     * Clone this queue
     */
    clone(): Queue<T> {
        return new Queue(this.list);
    }
}