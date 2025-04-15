import { sum } from '../../src/utils/sum';

describe('Math Functions', () => {
    describe('sum function', () => {
        it('should add two positive numbers correctly', () => {
            expect(sum(1, 2)).toBe(3);
        });

        it('should add a positive and a negative number correctly', () => {
            expect(sum(1, -1)).toBe(0);
        });
    });
});