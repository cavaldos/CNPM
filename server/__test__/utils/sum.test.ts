import { sum } from '../../src/utils/sum';

describe('Math Functions', () => {
    describe('sum function', () => {
        it('should add two positive numbers correctly', () => {
            expect(sum(1, 2)).toBe(3);
        });
    });
});