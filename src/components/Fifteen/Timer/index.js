import './index.css';
import { useEffect, useState } from 'react';
import { ACTIONS } from '../../Fifteen';
import useInterval from '../../../hooks/useInterval';

const Timer = ({ dispatch, currentPlayer }) => {
  const [timer, setTimer] = useState(15);
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

export default Timer;
