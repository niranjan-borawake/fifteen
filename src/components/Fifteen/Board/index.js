import './index.css';
import PropTypes from 'prop-types';

import Number from './Number';

const Board = ({
  boardNumbers,
  currentSelections,
  dispatch,
  isGameOver,
  isBotTurn,
}) => {
  return (
    <div className="board" data-testid="board">
      {boardNumbers.map(number => (
        <Number
          key={number.id}
          isGameOver={isGameOver}
          number={number}
          currentSelections={currentSelections}
          dispatch={dispatch}
          isBotTurn={isBotTurn}
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
  isBotTurn: PropTypes.bool.isRequired,
};

export default Board;
