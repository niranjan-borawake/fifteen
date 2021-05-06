import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ACTIONS } from '../../reducer.js';

import './index.css';

const Number = ({
  number: { value, id, isUsed },
  currentSelections,
  isGameOver,
  dispatch,
}) => {
  const onNumberClick = () => {
    if (isUsed || isGameOver) {
      return;
    }

    if (currentSelections.includes(id)) {
      dispatch({
        type: ACTIONS.REMOVE_FROM_CURRENT_SELECTIONS,
        toBeRemoved: id,
      });
      return;
    }

    if (currentSelections.length < 3) {
      dispatch({
        type: ACTIONS.ADD_TO_CURRENT_SELECTIONS,
        toBeAdded: id,
      });
    }
  };
  return (
    <div
      data-testid={`number-${id}`}
      className={classNames({
        number: true,
        selected: currentSelections.includes(id),
        used: isUsed,
      })}
      onClick={onNumberClick}
    >
      {value}
    </div>
  );
};

Number.propTypes = {
  number: PropTypes.shape({
    value: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    isUsed: PropTypes.bool.isRequired,
  }).isRequired,
  currentSelections: PropTypes.arrayOf(PropTypes.number).isRequired,
  isGameOver: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default React.memo(Number);
