import './index.css';
import fifteen from './fifteen.jpeg';

const Rules = ({ startGame }) => {
  return (
    <div className="home">
      <img src={fifteen} className="banner"></img>
      <div className="rules">
        <p>
          Players take it in turns to select 2 or 3 circles that total 15 in
          15s.
        </p>
        <p>
          A player could select 2 circles, e.g. 7 and 8 or 3 circles, e.g. 4, 5
          and 6.
        </p>
        <p>The last player who selects a combination of 15 is the winner.</p>
        <button onClick={startGame}>OK</button>
      </div>
    </div>
  );
};

export default Rules;
