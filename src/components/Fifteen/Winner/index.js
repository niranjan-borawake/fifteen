const { FIFTEEN } = require('../../../constants');

import './index.css';

const Winner = () => {
  return (
    <div className="winner">
      <div>
        <div className="jump">{FIFTEEN}</div>
      </div>
    </div>
  );
};

export default Winner;
