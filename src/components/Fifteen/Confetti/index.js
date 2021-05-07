// import { useEffect } from 'react';
import './index.css';

const getStyles = () => {
  const styles = [];
  for (let i = 0; i < 100; i++) {
    var rotation = Math.floor(Math.random() * 360);
    var right = Math.floor(
      Math.random() *
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    );
    var top = Math.floor(
      Math.random() *
        Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 500
        )
    );
    var delay = Math.floor(Math.random() * 15);

    var colors = [
      '#8d6e63',
      '#795548',
      '#6d4c41',
      '#5d4037',
      '#4e342e',
      '#3e2723',
    ];
    var color = colors[Math.floor(Math.random() * colors.length)];

    const style = {};
    style.top = top + 'px';
    style.right = right + 'px';
    style.backgroundColor = color;
    style.transform = 'skew(15deg) rotate(' + rotation + 'deg)';
    style.animationDelay = delay + 's';
    styles.push(style);
  }
  return styles;
};
const Confetti = () => {
  const styles = getStyles();
  return (
    <div className="confetti-wrapper">
      {styles.map((style, index) => (
        <div key={index} className="confetti" style={style}></div>
      ))}
    </div>
  );
};

export default Confetti;
