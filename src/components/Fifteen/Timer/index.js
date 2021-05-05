import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ACTIONS } from '../reducer.js';
import { PLAYERS, FIFTEEN } from '../../../constants.js';
import useInterval from '../../../hooks/useInterval';

import './index.css';

const Timer = ({ dispatch, currentPlayer }) => {
  const [timer, setTimer] = useState(FIFTEEN);
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
    <label className={`timer player-${currentPlayer}`}>
      {`00:${timer < 10 ? '0' + timer : timer}`}{' '}
    </label>
  );
};

Timer.propTypes = {
  currentPlayer: PropTypes.oneOf([PLAYERS.ONE, PLAYERS.TWO]),
  dispatch: PropTypes.func.isRequired,
};

export default Timer;
