import PropTypes from 'prop-types';
import { ShareIcon, HeartIcon } from '@heroicons/react/solid';

import fifteen from './fifteen.jpeg';
import NDAvatar from './NDAvatar.svg';

import './index.css';

const shareData = {
  title: 'Fifteen',
  text: 'A simple 2 player game.',
  url: 'https://www.niranjanborawake.in/fifteen/',
};

const onShare = async () => {
  try {
    await navigator.share(shareData);
  } catch (err) {
    console.log('Error sharing');
  }
};

const Home = ({ startGame, setPlayingAgainstBot, playingAgainstBot }) => {
  const canShare = true || !!navigator.share;

  const onOpponentSelect = event => {
    setPlayingAgainstBot(event.target.value === 'bot');
  };

  return (
    <div className="home">
      <div className="banner">
        <img src={fifteen} alt="15"></img>
      </div>
      <div className="details">
        <div className="rules">
          <p>
            Players take it in turns to select 2 or 3 circles that total 15 in
            15s.
          </p>
          <p>
            A player could select 2 circles, e.g. 7 and 8 or 3 circles, e.g. 4,
            5 and 6.
          </p>
          <p>The last player who selects a combination of 15 is the winner.</p>
        </div>
        <div className="controls">
          <div className="opponent">
            <span>Play against : </span>
            <input
              id="bot"
              type="radio"
              name="againstBot"
              value="bot"
              checked={playingAgainstBot}
              onChange={onOpponentSelect}
            ></input>
            <label htmlFor="bot">Bot</label>
            <input
              id="friend"
              type="radio"
              name="againstBot"
              value="friend"
              checked={!playingAgainstBot}
              onChange={onOpponentSelect}
            ></input>
            <label htmlFor="friend">Friend</label>
          </div>
          <button onClick={startGame}>START</button>
        </div>
        <div className="social">
          <a href="https://twitter.com/niranjandb" className="built-by">
            <img className="avatar" src={NDAvatar}></img>
          </a>
          <div className="like-and-share">
            <a href="https://twitter.com/niranjandb">
              <HeartIcon className="icon" />
            </a>
            {canShare && <ShareIcon className="icon" onClick={onShare} />}
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  startGame: PropTypes.func.isRequired,
  setPlayingAgainstBot: PropTypes.func.isRequired,
  playingAgainstBot: PropTypes.bool.isRequired,
};

export default Home;
