import './index.css';
import PropTypes from 'prop-types';

import Number from './Number';

const Board = ({ boardNumbers, currentSelections, dispatch, isGameOver }) => {
  return (
    <div className="board">
      {boardNumbers.map(number => (
        <Number
          key={number.id}
          isGameOver={isGameOver}
          number={number}
          currentSelections={currentSelections}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
};

Board.propTypes = {
  boardNumbers: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      isUsed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  currentSelections: PropTypes.arrayOf(PropTypes.number).isRequired,
  isGameOver: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Board;
