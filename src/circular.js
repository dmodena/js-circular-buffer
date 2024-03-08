'use strict';

export class CircularBuffer {
    #buffer;
    #capacity;
    #head;
    #length;
    #tail;

    constructor(capacity) {
        this.#capacity = capacity;
        this.#buffer = new Array(this.#capacity);
        this.#head = this.#tail = this.#length = 0;
    }

    get length() {
        return this.#length;
    }

    read() {
        if (this.#length === 0)
            throw new Exception('Cannot read: buffer is empty');

        const value = this.#buffer[this.#tail];
        this.#tail = (this.#tail + 1) % this.#capacity;
        this.#length--;

        return value;
    }

    write(value) {
        if (this.#length === this.#capacity)
            throw new Exception('Cannot write: buffer is full');

        this.#buffer[this.#head] = value;
        this.#head = (this.#head + 1) % this.#capacity;
        this.#length++;
    }

    forceWrite(value) {
        if (this.#length < this.#capacity) {
            this.write(value);
            return;
        }

        this.#buffer[this.#head] = value;
        this.#head = (this.#head + 1) % this.#capacity;
        this.#tail = (this.#tail + 1) % this.#capacity;
    }

    clear() {
        this.#head = this.#tail = this.#length = 0;
    }
}
