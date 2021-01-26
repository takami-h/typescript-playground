import { time } from 'console';
import { sum } from './index';

describe('index', () => {
  describe('sum', () => {
    it('should add all', () => {
      expect(sum(1, 2, 3)).toBe(6);
    });
  });
  describe('type', () => {
    it('should check type', () => {
      function squareOf(n: number) {
        return n * n;
      }
      expect(squareOf(2)).toBe(4);
    });
    it('should check type of properties', () => {
      class Person {
        constructor(
          public readonly firstName: string,
          public readonly lastName: string
        ) {}
        fullName() {
          return `${this.firstName} ${this.lastName}`;
        }
      }
      const john = new Person('John', 'Doe');
      expect(john.fullName()).toBe('John Doe');
    });
    it('can use tuple', () => {
      type FirstName = string;
      type LastName = string;
      type Age = number;

      const people: readonly [FirstName, LastName, Age][] = [
        ['John', 'Doe', 20],
        ['Taro', 'Yamada', 30]
      ];
      expect(people[1][2]).toBe(30);
      // people[0] = ['Jack', 'Doe', 31];
    });
  });
  describe('function', () => {
    it('is typed', () => {
      const add = (a: number, b: number): number => a + b;
      expect(add(1, 2)).toBe(3);

      type Log = (message: string, userId?: string) => void;
      const log: Log = (message, userId = 'Not signed in') => {
        const time = new Date().toLocaleTimeString();
        console.info(time, message, userId);
      }
      log('Page loaded');
      log('User signed in', 'someone');

      function concat(...strs: string[]): string {
        return strs.reduce((result, s) => result.concat(s), '');
      }
      expect(concat('tic', 'tac', 'toe')).toBe('tictactoe');

      function times(
        f: (index: number) => void,
        n: number
      ) {
        for (let i = 0; i < n; i++) f(i);
      }
      times(i => console.info(i), 5);
    });
  });
});
