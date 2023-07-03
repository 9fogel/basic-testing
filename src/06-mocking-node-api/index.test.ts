// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import * as fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timerSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(timerSpy).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 2000);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(2000);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const timerSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(timerSpy).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(3000);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathJoinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously('index.ts');

    expect(pathJoinSpy).toBeCalledWith(__dirname, 'index.ts');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('index.ts');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest
      .spyOn(fsPromises, 'readFile')
      .mockReturnValue(Promise.resolve('Text content of the file'));
    const result = await readFileAsynchronously('index.ts');
    expect(result).toBe('Text content of the file');
  });
});
