import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Products from '../product/pages/Products';
import Header from '../UIElement/Header';
import Auth from '../users/pages/Auth';

import './AppRouter.css';
export default function AppRouter() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path='/' exact>
              <Auth />
            </Route>
            <Route path='/products'>
              <Products />
            </Route>
          </Switch>
        </main>
      </Router>
    </>
  );
}
