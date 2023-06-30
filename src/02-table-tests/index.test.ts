// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 3, action: Action.Add, expected: 5 },
  { a: 9, b: 7, action: Action.Subtract, expected: 2 },
  { a: 2, b: 10, action: Action.Multiply, expected: 20 },
  { a: 16, b: 8, action: Action.Divide, expected: 2 },
  { a: 9, b: 2, action: Action.Exponentiate, expected: 81 },
  { a: 16, b: 8, action: 'concat', expected: null },
  { a: 'one', b: 'two', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform specified action on two numbers',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
