import React from 'react';
import ReactDOM from 'react-dom';
import Fifteen from './components/Fifteen';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Fifteen />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
