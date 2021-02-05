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
    it('with generics', () => {
      type Filter = {
        <T>(array: T[], f: (item: T) => boolean): T[]
      };
      const filter: Filter = (array, f) => {
        return array.filter(f);
      };
      expect(filter([1, 2, 3], _ => _ < 3)).toStrictEqual([1, 2]);
      expect(filter(['hello', 'world', '!'], _ => _.length <= 4)).toStrictEqual(['!']);
      expect(filter([{name: 'john doe'}, {name: 'taro yamada'}], _ => _.name.length <= 8)).toStrictEqual([{name: 'john doe'}]);

    });
  });
  describe('class and interface', () => {
    it('can be used.', () => {
      class Set {
        add(value: number): this {
          return this;
        }
      }
      class MutableSet extends Set {
      }
      let a = new MutableSet();
      a = a.add(1);
  
      interface Sushi {
        calories: number
        salty: boolean
        tasty: boolean
        price(): number
      }
      let toro: Sushi = {
        calories: 200,
        salty: true,
        tasty: true,
        price() { return 300; }
      };
      class Gunkan implements Sushi {
        calories = 100;
        salty = false;
        tasty = true;
        price() {
          return 100;
        }
      }

      type Options = {
        baseURL: string
        cacheSize?: number
        tier?: 'prod' | 'dev'
      }
      // const opts: Options = {
      //   baseURL: 'https://example.com',
      //   foo: 'prod'
      // };

      // tagged type
      type UserTextEvent = {type: 'TextEvent', value: string}
      type UserMouseEvent = {type: 'MouseEvent', value: [number, number]}
      type UserEvent = UserTextEvent | UserMouseEvent
      function handle(event: UserEvent) {
        if (event.type === 'TextEvent') {
          event.value
        } else {
          event.value[1];
        }
      }

      type APIResponse = {
        user: {
          userId: string
          friendList: {
            count: number
            friends: {
              firstName: string
              lastName: String
            }[]
          }
        }
      };
      // lookup type
      type FriendList = APIResponse['user']['friendList']
      // keyof operator
      type UserKeys = keyof APIResponse['user']
      let friends: FriendList = {
        count: 2,
        friends: [
          {firstName: 'John', lastName: 'Doe'},
          {firstName: 'Taro', lastName: 'Yamada'},
        ]
      };

      // record type
      type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
      type Day = Weekday | 'Sat' | 'Sun'
      // let nextDay: Record<Weekday, Day> = {
      //   Mon: 'Tue',
      //   Tue: 'Wed',
      // }
      // map type
      // let nextDay: {[K in Weekday]: Day} = {
      //   Mon: 'Tue'
      // }

      // user-defined type guard
      function isString(a: unknown): a is string {
        return typeof a === 'string'
      }
      function parseInput(input: string | number) {
        let formattedInput: string
        if (isString(input)) {
          formattedInput = input.toUpperCase();
        }
      }

    });
  });
});
