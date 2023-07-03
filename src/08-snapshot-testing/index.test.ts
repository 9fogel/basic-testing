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
  exports[`should generate linked list from values 2`] = {
    value: 2,
    next: { value: 4, next: { value: 6, next: { value: null, next: null } } },
  };

  test('should generate linked list from values 2', () => {
    const elementsList = [2, 4, 6];
    const generatedList = generateLinkedList(elementsList);
    expect(generatedList).toMatchSnapshot();
  });
});
