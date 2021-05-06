import PropTypes from 'prop-types';

import fifteen from './fifteen.jpeg';

import './index.css';

const Home = ({ startGame }) => {
  return (
    <div className="home">
      <div className="banner">
        <img src={fifteen} alt="15"></img>
      </div>
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
        <button onClick={startGame}>START</button>
      </div>
    </div>
  );
};

Home.propTypes = {
  startGame: PropTypes.func.isRequired,
};

export default Home;
