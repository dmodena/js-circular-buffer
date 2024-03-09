'use strict';

import { InvalidOperationError } from "./invalidOperationError";
/**
 * Implements a circular buffer using an array of fixed length.
 */
export class CircularBuffer {
    #buffer;
    #capacity;
    #head;
    #length;
    #tail;

    /**
     * Implements a circular buffer using an array of fixed length.
     * @param {*} capacity number of items supported by buffer
     */
    constructor(capacity) {
        this.#capacity = capacity;
        this.#buffer = new Array(this.#capacity);
        this.#head = this.#tail = this.#length = 0;
    }

    /**
     * Returns the number of items in the buffer.
     */
    get length() {
        return this.#length;
    }

    /**
     * Returns oldest value from buffer.
     * @returns value
     * @throws {InvalidOperationError} when buffer is empty
     */
    read() {
        if (this.#length === 0)
            throw new InvalidOperationError('Cannot read: buffer is empty');

        const value = this.#buffer[this.#tail];
        this.#tail = (this.#tail + 1) % this.#capacity;
        this.#length--;

        return value;
    }

    /**
     * Writes value to buffer.
     * @param {*} value value to be written to buffer
     * @throws {InvalidOperationError} when buffer is full
     */
    write(value) {
        if (this.#length === this.#capacity)
            throw new InvalidOperationError('Cannot write: buffer is full');

        this.#buffer[this.#head] = value;
        this.#head = (this.#head + 1) % this.#capacity;
        this.#length++;
    }

    /**
     * Writes value to buffer, overriding oldest value if buffer is full.
     * @param {*} value value to be written to buffer
     */
    forceWrite(value) {
        if (this.#length < this.#capacity) {
            this.write(value);
            return;
        }

        this.#buffer[this.#head] = value;
        this.#head = (this.#head + 1) % this.#capacity;
        this.#tail = (this.#tail + 1) % this.#capacity;
    }

    /**
     * Clears out the buffer.
     */
    clear() {
        this.#head = this.#tail = this.#length = 0;
    }
}
