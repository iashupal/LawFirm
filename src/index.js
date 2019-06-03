import React from 'react';
import ReactDOM from 'react-dom';

import 'weather-icons/weather-icons/weather-icons.min.less';
// import './assets/flag/sprite-flags-24x24.css';
import './assets/animate.css';
import 'react-picky/dist/picky.css'; // Include CSS
import * as Raven from './helpers/sentry';

Raven.install();
const rootEl = document.getElementById('app-site');

// Create a reusable render method that we can call more than once
const render = () => {
  // Dynamically import our main App component, and render it
  const MainApp = require('./MainApp').default;

  window.onbeforeunload = () => {
    localStorage.removeItem('user'); // 사용자 정보 삭제 (보안, token은 남김)
    return undefined; // 닫을때 confirm 보여주지 않음.
  };

  ReactDOM.render(<MainApp />, rootEl);
};

if (module.hot) {
  module.hot.accept('./MainApp', () => {
    const NextApp = require('./MainApp').default;
    render(<NextApp />, rootEl);
  });
}

render();
