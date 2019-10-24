import React from 'react';
import './App.scss';
import SearchPage from './pages/search/searchPage';
import CollectionPage from './pages/collection/collection';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="container">
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/">
            <CollectionPage />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
