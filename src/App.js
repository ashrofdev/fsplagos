import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LandingPage from './Pages/LandingPage';
import './Styles/main.scss'

const App = () => {
  return (
    <div className="app">
      
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={HomePage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;