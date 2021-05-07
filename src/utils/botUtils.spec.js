import { getNumbersWithSumFifteen } from './botUtils.js';
import { FIFTEEN } from '../constants.js';

describe('Bot Utils', () => {
  it('should find numbers that sum up 15', () => {
    let boardNumbers = '123456789'.split('').map(number => ({
      value: +number,
      isUsed: false,
      id: +number - 1,
    }));
    let numbers = getNumbersWithSumFifteen(boardNumbers);
    expect(numbers[0].value + numbers[1].value + numbers[2].value).toEqual(
      FIFTEEN
    );

    boardNumbers = '12345678'.split('').map(number => ({
      value: +number,
      isUsed: false,
      id: +number - 1,
    }));
    numbers = getNumbersWithSumFifteen(boardNumbers);
    expect(numbers[0].value + numbers[1].value + numbers[2].value).toEqual(
      FIFTEEN
    );

    boardNumbers = '34567'.split('').map(number => ({
      value: +number,
      isUsed: false,
      id: +number - 1,
    }));
    numbers = getNumbersWithSumFifteen(boardNumbers);
    expect(numbers[0].value + numbers[1].value + numbers[2].value).toEqual(
      FIFTEEN
    );

    boardNumbers = '1278'.split('').map(number => ({
      value: +number,
      isUsed: false,
      id: +number - 1,
    }));
    numbers = getNumbersWithSumFifteen(boardNumbers);
    expect(numbers[0].value + numbers[1].value).toEqual(FIFTEEN);
  });

  it('should ignore used numbers and find numbers that sum up 15', () => {
    let boardNumbers = '123456789'.split('').map(number => ({
      value: +number,
      isUsed: +number === 1 || +number === 5,
      id: +number - 1,
    }));
    let numbers = getNumbersWithSumFifteen(boardNumbers);
    expect(numbers[0].value + numbers[1].value + numbers[2].value).toEqual(
      FIFTEEN
    );
  });

  it('should return empty [] if it can not find numbers that sum up 15', () => {
    let boardNumbers = '1234'.split('').map(number => ({
      value: +number,
      isUsed: false,
      id: +number - 1,
    }));
    let numbers = getNumbersWithSumFifteen(boardNumbers);
    expect(numbers).toEqual([]);
  });
});
