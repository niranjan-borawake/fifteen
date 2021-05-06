import { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';

import { PLAYERS, FIFTEEN } from '../../constants.js';
import { initialState, reducer, ACTIONS } from './reducer.js';
import Board from './Board';
import Rules from './Rules';
import Timer from './Timer';

import './index.css';

const isSumOfSelectionsFifteen = (currentSelections, boardNumbers) => {
  return (
    boardNumbers
      .filter(({ id }) => currentSelections.includes(id))
      .map(({ value }) => value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0) ===
    FIFTEEN
  );
};

const Fifteen = ({ testBoardNumbers }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [rulesVisible, setRulesVisible] = useState(true);
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

  if (rulesVisible) {
    return <Rules startGame={() => setRulesVisible(false)} />;
  }

  return (
    <div className={`fifteen player-${currentPlayer}`}>
      <div className="result-and-timer">
        {isGameOver && (
          <div data-testid="game-result-player-2" className="player-2">
            {loser === PLAYERS.TWO ? 'You Lost' : 'You Won'}
          </div>
        )}
        {currentPlayer === PLAYERS.ONE && !isGameOver && (
          <Timer currentPlayer={currentPlayer} dispatch={dispatch} />
        )}
      </div>
      <Board
        isGameOver={isGameOver}
        dispatch={dispatch}
        currentSelections={currentSelections}
        boardNumbers={testBoardNumbers || boardNumbers}
      />
      <div className="result-and-timer">
        {isGameOver && (
          <div data-testid="game-result-player-1" className="player-1">
            {loser === PLAYERS.ONE ? 'You Lost' : 'You Won'}
          </div>
        )}
        {currentPlayer === PLAYERS.TWO && !isGameOver && (
          <Timer currentPlayer={currentPlayer} dispatch={dispatch} />
        )}
      </div>
    </div>
  );
};

Fifteen.propTypes = {
  testBoardNumbers: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      isUsed: PropTypes.bool.isRequired,
    })
  ),
};
export default Fifteen;
