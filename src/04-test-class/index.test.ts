// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const myBankAccount = getBankAccount(10000);
    expect(myBankAccount).toBeInstanceOf(BankAccount);
    expect(myBankAccount.getBalance()).toBe(10000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(12000).withdraw(20000)).toThrow(
      new InsufficientFundsError(12000),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      getBankAccount(8000).transfer(15000, getBankAccount(5000)),
    ).toThrow(new InsufficientFundsError(8000));
  });

  test('should throw error when transferring to the same account', () => {
    const myBankAccount = getBankAccount(8000);
    expect(() => myBankAccount.transfer(15000, myBankAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const myBankAccount = getBankAccount(5000);
    const initialBalance = myBankAccount.getBalance();
    expect(myBankAccount.deposit(4000).getBalance()).toBe(
      initialBalance + 4000,
    );
  });

  test('should withdraw money', () => {
    const myBankAccount = getBankAccount(5000);
    const initialBalance = myBankAccount.getBalance();
    expect(myBankAccount.withdraw(4000).getBalance()).toBe(
      initialBalance - 4000,
    );
  });

  test('should transfer money', () => {
    const myBankAccount = getBankAccount(7000);
    const myInitialBalance = myBankAccount.getBalance();
    const toAccount = getBankAccount(3000);
    const toAccountInitialBalance = toAccount.getBalance();

    expect(myBankAccount.withdraw(4000).getBalance()).toBe(
      myInitialBalance - 4000,
    );
    expect(toAccount.deposit(4000).getBalance()).toBe(
      toAccountInitialBalance + 4000,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.mock('lodash/random');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const lodash = require('lodash');
    lodash.random = jest.fn(() => 1);

    const myBankAccount = getBankAccount(7000);
    const returnValue = await myBankAccount.fetchBalance();

    expect(typeof returnValue).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.mock('lodash/random');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const lodash = require('lodash');
    lodash.random = jest.fn(() => 1);

    const myBankAccount = getBankAccount(7000);
    const myInitialBalance = myBankAccount.getBalance();
    await myBankAccount.synchronizeBalance();
    const updatedBalance = myBankAccount.getBalance();
    expect(updatedBalance).not.toBe(myInitialBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.mock('lodash/random');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const lodash = require('lodash');
    lodash.random = jest.fn(() => 0);

    const myBankAccount = getBankAccount(7000);
    await expect(myBankAccount.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
