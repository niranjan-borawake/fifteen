import './index.css';
import { useEffect, useReducer } from 'react';
import Board from './Board';
import Timer from './Timer';

const PLAYERS = {
  ONE: 1,
  TWO: 2,
};
function selectFrom(lowerValue, upperValue) {
  var choices = upperValue - lowerValue + 1;
  return Math.floor(Math.random() * choices + lowerValue);
}
let boardNumbers = [];
for (let i = 0; i < 50; i++) {
  boardNumbers.push({ value: selectFrom(1, 9), isUsed: false, id: i });
}
const initialState = {
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
const reducer = (state, action) => {
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
const isSumOfSelectionsFifteen = (currentSelections, boardNumbers) => {
  return (
    boardNumbers
      .filter(({ id }) => currentSelections.includes(id))
      .map(({ value }) => value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0) ===
    15
  );
};
const Fifteen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    boardNumbers,
    currentPlayer,
    currentSelections,
    loser,
    isGameOver,
  } = state;
  useEffect(() => {
    if (isSumOfSelectionsFifteen(currentSelections, boardNumbers)) {
      dispatch({ type: ACTIONS.TOGGLE_CURRENT_PLAYER });
    }
  }, [currentSelections, boardNumbers]);

  return (
    <div className={`fifteen player-${currentPlayer}`}>
      <div className="result-and-timer">
        {isGameOver && (
          <div className="player-2">
            {loser === PLAYERS.TWO ? 'You Lost' : 'You Won'}
          </div>
        )}
        {currentPlayer === PLAYERS.ONE && !isGameOver && (
          <Timer
            currentPlayer={currentPlayer}
            isGameOver={isGameOver}
            dispatch={dispatch}
          />
        )}
      </div>
      <Board
        isGameOver={isGameOver}
        dispatch={dispatch}
        currentSelections={currentSelections}
        boardNumbers={boardNumbers}
      />
      <div className="result-and-timer">
        {isGameOver && (
          <div className="player-1">
            {loser === PLAYERS.ONE ? 'You Lost' : 'You Won'}
          </div>
        )}
        {currentPlayer === PLAYERS.TWO && !isGameOver && (
          <Timer
            currentPlayer={currentPlayer}
            isGameOver={isGameOver}
            dispatch={dispatch}
          />
        )}
      </div>
    </div>
  );
};
export default Fifteen;
