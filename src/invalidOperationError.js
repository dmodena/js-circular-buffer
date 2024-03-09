'use strict';

export class InvalidOperationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidOperationError';
    }
}
