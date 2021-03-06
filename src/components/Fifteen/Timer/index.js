import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ACTIONS } from '../reducer.js';
import { PLAYERS, FIFTEEN } from '../../../constants.js';
import useInterval from '../../../hooks/useInterval';

import './index.css';

const Timer = ({ dispatch, currentPlayer, testTimer }) => {
  const [timer, setTimer] = useState(testTimer || FIFTEEN);
  useEffect(() => {
    if (timer === 0) {
      dispatch({ type: ACTIONS.SET_GAME_OVER });
    }
  }, [dispatch, timer]);

  useInterval(() => {
    if (timer > 0) {
      setTimer(timer - 1);
    }
  }, 1000);

  return (
    <label
      data-testid={`timer-player-${currentPlayer}`}
      className={`timer player-${currentPlayer}`}
    >
      {timer}
    </label>
  );
};

Timer.propTypes = {
  currentPlayer: PropTypes.oneOf([PLAYERS.ONE, PLAYERS.TWO]),
  dispatch: PropTypes.func.isRequired,
  testTimer: PropTypes.number,
};

export default Timer;
