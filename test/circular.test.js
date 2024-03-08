'use strict';

import { range } from "../lib/range";
import { CircularBuffer } from "../src/circular";

describe('Circular buffer', () => {
    let cases = [];

    cases = [
        [[], 0],
        [[1], 1],
        [[1, 2, 3], 3],
        [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 10]
    ];
    test.each(cases)('should return length', (items, expected) => {
        const circular = new CircularBuffer(10);

        items.forEach(item => circular.write(item));

        expect(circular.length).toBe(expected);
    });

    cases = [
        [[]],
        [['a']],
        [['a', 'b', 'c']],
        [['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']]
    ];
    test.each(cases)('should write items when buffer is not full', (items) => {
        const circular = new CircularBuffer(10);

        const write = (values) => values.forEach(value => circular.write(value));

        expect(() => write(items)).not.toThrow();
    });

    cases = [
        [[1], 2],
        [['a', 'b', 'c'], 'd'],
        [[true, true, true, true, true], false]
    ];
    test.each(cases)('should throw when trying to add to full buffer', (items, additional) => {
        const circular = new CircularBuffer(items.length);

        items.forEach(value => circular.write(value));

        expect(() => write(additional)).toThrow();
    });

    cases = [
        [[1, 2, 3]],
        [['a', 'b', 'c']],
        [[6, 7, 8, 9]],
        [['q', 'w', 'e', 'r', 't', 'y']]
    ];
    test.each(cases)('should read oldest value from buffer', (items) => {
        const circular = new CircularBuffer(7);

        items.forEach((item) => circular.write(item));

        expect(circular.read()).toBe(items[0]);
    });

    cases = [
        [[1]],
        [[1, 2, 3]],
        [[1, 2, 3, 4, 5]]
    ];
    test.each(cases)('should read items when buffer is not empty', (items) => {
        const circular = new CircularBuffer(items.length);

        items.forEach((item) => circular.write(item));

        const read = (values) => { for (let value of values) { circular.read() } };

        expect(() => read(items)).not.toThrow();
    });

    test('should throw when trying to read from empty buffer', () => {
        const circular = new CircularBuffer(3);

        expect(() => circular.read()).toThrow();
    });

    cases = [
        [[1]],
        [[1, 2, 3]],
        [[1, 2, 3, 4, 5]]
    ];
    test.each(cases)('should forceWrite items when buffer is not full', (items) => {
        const circular = new CircularBuffer(5);

        const forceWrite = (values) => values.forEach(value => circular.forceWrite(value));

        expect(() => forceWrite(items)).not.toThrow();
    });

    test('should overwrite items on forceWrite when buffer is full', () => {
        const circular = new CircularBuffer(3);

        Array.from(range(3)).forEach((value) => circular.write(value));

        expect(() => circular.forceWrite(4)).not.toThrow();
    });

    test('should read oldest value after forceWrite', () => {
        const circular = new CircularBuffer(5);

        Array.from(range(7)).forEach((value) => circular.forceWrite(value));

        expect(circular.read()).toBe(2);
    });

    test('should have an empty buffer after clear', () => {
        const circular = new CircularBuffer(3);

        Array.from(range(1, 4)).forEach((value) => circular.write(value));
        circular.clear();

        expect(circular.length).toBe(0);
        expect(() => circular.read()).toThrow();
    });
});
