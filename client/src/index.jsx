import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import App from './components/App.jsx';
import GlobalStyle from './utils/global.js';
import Theme from './utils/theme.js';

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <App />
    <GlobalStyle />
  </ThemeProvider>,
  document.getElementById('app')
);