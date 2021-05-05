import { PLAYERS } from '../../constants';

function selectFrom(lowerValue, upperValue) {
  var choices = upperValue - lowerValue + 1;
  return Math.floor(Math.random() * choices + lowerValue);
}

let boardNumbers = [];

for (let i = 0; i < 50; i++) {
  boardNumbers.push({ value: selectFrom(1, 9), isUsed: false, id: i });
}

export const initialState = {
  boardNumbers,
  currentPlayer: PLAYERS.ONE,
  currentSelections: [],
  loser: '',
  isGameOver: false,
};

export const ACTIONS = {
  TOGGLE_CURRENT_PLAYER: 5,
  SET_GAME_OVER: 10,
  ADD_TO_CURRENT_SELECTIONS: 11,
  REMOVE_FROM_CURRENT_SELECTIONS: 13,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_CURRENT_PLAYER: {
      const { boardNumbers, currentSelections } = state;
      currentSelections.forEach(selection => {
        boardNumbers.find(
          boardNumber => boardNumber.id === selection
        ).isUsed = true;
      });
      return {
        ...state,
        currentSelections: [],
        currentPlayer:
          state.currentPlayer === PLAYERS.ONE ? PLAYERS.TWO : PLAYERS.ONE,
        boardNumbers: [...boardNumbers],
      };
    }
    case ACTIONS.ADD_TO_CURRENT_SELECTIONS:
      return {
        ...state,
        currentSelections: [...state.currentSelections, action.toBeAdded],
      };
    case ACTIONS.REMOVE_FROM_CURRENT_SELECTIONS: {
      const { currentSelections } = state;
      currentSelections.includes(action.toBeRemoved) &&
        currentSelections.splice(
          currentSelections.indexOf(action.toBeRemoved),
          1
        );
      return {
        ...state,
        currentSelections: [...currentSelections],
      };
    }
    case ACTIONS.SET_GAME_OVER:
      return { ...state, isGameOver: true, loser: state.currentPlayer };
  }
};
