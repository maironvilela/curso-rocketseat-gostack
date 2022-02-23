import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyled from './styles/global';

import Routes from './routes/index';

import AppProvider from './hooks/index';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>
    <GlobalStyled />
  </Router>
);

export default App;
