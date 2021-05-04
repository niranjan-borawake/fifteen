import './index.css';
import { ACTIONS } from '../..';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Number = ({
  number: { value, id, isUsed },
  currentSelections,
  dispatch,
  isGameOver,
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
  addToSelections: PropTypes.func.isRequired,
};
// function areEqual(prevProps, nextProps) {
//   return (
//     prevProps.number.isUsed === nextProps.number.isUsed &&
//     prevProps.currentSelections.includes(prevProps.number.id) ===
//       nextProps.currentSelections.includes(nextProps.number.id)
//   );
// }
export default React.memo(Number);
