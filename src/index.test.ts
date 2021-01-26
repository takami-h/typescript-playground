import { sum } from './index';

describe('index', () => {
  describe('sum', () => {
    it('should add all', () => {
      expect(sum(1, 2, 3)).toBe(6);
    });
  });
});