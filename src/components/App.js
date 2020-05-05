import React from 'react';
import Header from './Header';
import TicketControl from './TicketControl';
import Signin from './Signin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/">
            <TicketControl />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
