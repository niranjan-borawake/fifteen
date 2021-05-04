import './index.css';
import Number from './Number';

const Board = ({ boardNumbers, currentSelections, dispatch }) => {
  return (
    <div className="board">
      {boardNumbers.map(number => (
        <Number
          number={number}
          currentSelections={currentSelections}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
};

export default Board;
