import { FIFTEEN } from '../constants';

const shuffleArray = array => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
export const getNumbersWithSumFifteen = (boardNumbers, sum = FIFTEEN) => {
  let numbers = [];
  const allowedNumbers = shuffleArray(
    boardNumbers.filter(boardNumber => !boardNumber.isUsed)
  );
  const numberCount = allowedNumbers.length;
  for (let i = 0; i < numberCount - 2; i++) {
    for (let j = i + 1; j < numberCount - 1; j++) {
      for (let k = j + 1; k < numberCount; k++) {
        if (
          allowedNumbers[i].value +
            allowedNumbers[j].value +
            allowedNumbers[k].value ==
          sum
        ) {
          numbers.push(allowedNumbers[i]);
          numbers.push(allowedNumbers[j]);
          numbers.push(allowedNumbers[k]);
          return numbers;
        }
      }
    }
  }

  for (let i = 0; i < numberCount - 1; i++) {
    for (let j = i + 1; j < numberCount - 0; j++) {
      if (allowedNumbers[i].value + allowedNumbers[j].value === sum) {
        numbers.push(allowedNumbers[i]);
        numbers.push(allowedNumbers[j]);
        return numbers;
      }
    }
  }
  return numbers;
};
