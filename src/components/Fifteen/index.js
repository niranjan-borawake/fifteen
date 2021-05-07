import { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { HomeIcon, RefreshIcon } from '@heroicons/react/solid';

import { PLAYERS, FIFTEEN } from '../../constants.js';
import { getNumbersWithSumFifteen } from '../../utils/botUtils.js';
import { getInitialState, reducer, ACTIONS } from './reducer.js';
import Board from './Board';
import Home from './Home';
import Timer from './Timer';

import Winner from './Winner/index.js';

import './index.css';
import Confetti from './Confetti/index.js';
import classNames from 'classnames';

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
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const [rulesVisible, setRulesVisible] = useState(true);
  const [playingAgainstBot, setPlayingAgainstBot] = useState(true);
  const {
    boardNumbers,
    currentPlayer,
    currentSelections,
    loser,
    isGameOver,
  } = state;

  const gotoHome = () => {
    dispatch({ type: ACTIONS.RE_START });
    setRulesVisible(true);
  };

  const reStart = () => {
    dispatch({ type: ACTIONS.RE_START });
  };

  const isBotTurn = () =>
    !!(playingAgainstBot && currentPlayer === PLAYERS.TWO);

  useEffect(() => {
    if (isSumOfSelectionsFifteen(currentSelections, boardNumbers)) {
      dispatch({ type: ACTIONS.TOGGLE_CURRENT_PLAYER });
    }
  }, [currentSelections, boardNumbers]);

  useEffect(() => {
    if (currentPlayer === PLAYERS.TWO && playingAgainstBot) {
      const numbers = getNumbersWithSumFifteen(boardNumbers);
      numbers.forEach(({ id }, index) => {
        setTimeout(() => {
          dispatch({
            type: ACTIONS.ADD_TO_CURRENT_SELECTIONS,
            toBeAdded: id,
          });
        }, 2000 * (index + 1));
      });
    }
  }, [currentPlayer, playingAgainstBot, boardNumbers]);

  if (rulesVisible) {
    return (
      <Home
        startGame={() => setRulesVisible(false)}
        setPlayingAgainstBot={setPlayingAgainstBot}
        playingAgainstBot={playingAgainstBot}
      />
    );
  }

  return (
    <div className={`fifteen player-${currentPlayer}`}>
      {isGameOver && <Confetti />}
      <div className="result-and-timer">
        {isGameOver && (
          <div data-testid="game-result-player-2" className="player-2">
            {loser === PLAYERS.TWO ? '0' : <Winner />}
          </div>
        )}
        {!isGameOver &&
          (currentPlayer === PLAYERS.TWO ? (
            <Timer currentPlayer={currentPlayer} dispatch={dispatch} />
          ) : (
            <label className="player-2">15</label>
          ))}
      </div>
      <Board
        isGameOver={isGameOver}
        dispatch={dispatch}
        currentSelections={currentSelections}
        boardNumbers={testBoardNumbers || boardNumbers}
        isBotTurn={isBotTurn()}
      />
      <div
        className={classNames({
          'result-and-timer': true,
          'game-over': isGameOver,
        })}
      >
        {isGameOver && <HomeIcon className="icon" onClick={gotoHome} />}
        {isGameOver && (
          <div data-testid="game-result-player-1" className="player-1">
            {loser === PLAYERS.ONE ? '0' : <Winner />}
          </div>
        )}
        {!isGameOver &&
          (currentPlayer === PLAYERS.ONE ? (
            <Timer currentPlayer={currentPlayer} dispatch={dispatch} />
          ) : (
            <label className="player-1">15</label>
          ))}
        {isGameOver && <RefreshIcon className="icon" onClick={reStart} />}
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
