// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = {
      value: 1,
      next: { value: 2, next: { value: 3, next: { value: null, next: null } } },
    };
    const elementsList = [1, 2, 3];
    const generatedList = generateLinkedList(elementsList);
    expect(generatedList).toStrictEqual(list);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
  });
});
