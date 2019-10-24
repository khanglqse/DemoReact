import SearchPage from "./pages/search/searchPage";
import CollectionPage from "./pages/collection/collection";
import React from 'react';
/*eslint-enable no-unused-vars*/
import {Route, IndexRoute} from 'react-router';
import  App  from './App'


export default (
    <Route path="/" component={App}>
      <Route path="/" component={CollectionPage} />
      <Route path="/search" component={SearchPage} /> 
    </Route>
  );
  