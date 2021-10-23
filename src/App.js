import logo from './logo.svg';
import React from "react";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home';
import Details from './components/details';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/company/:companyId">
            <Details />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
