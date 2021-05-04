import './index.css';
import { ACTIONS } from '../..';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Number = ({
  number: { value, id, isUsed },
  currentSelections,
  dispatch,
}) => {
  const onNumberClick = () => {
    if (isUsed) {
      return;
    }
    if (currentSelections.length < 3) {
      dispatch({
        type: ACTIONS.ADD_TO_CURRENT_SELECTIONS,
        toBeAdded: id,
      });
    }
    if (currentSelections.includes(id)) {
      dispatch({
        type: ACTIONS.REMOVE_FROM_CURRENT_SELECTIONS,
        toBeRemoved: id,
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
export default Number;
