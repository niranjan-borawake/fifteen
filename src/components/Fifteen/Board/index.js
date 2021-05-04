import './index.css';
import Number from './Number';

const Board = ({ boardNumbers, currentSelections, dispatch, isGameOver }) => {
  return (
    <div className="board">
      {boardNumbers.map(number => (
        <Number
          isGameOver={isGameOver}
          number={number}
          currentSelections={currentSelections}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
};

export default Board;
