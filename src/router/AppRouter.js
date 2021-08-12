import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../context/auth-context';
import Products from '../product/pages/Products';
import Header from '../UIElement/Header';
import Auth from '../users/pages/Auth';
import Profile from '../users/pages/Profile';

import './AppRouter.css';
export default function AppRouter() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <main>
            <Switch>
              <Route path='/' exact>
                <Products />
              </Route>
              <Route path='/auth'>
                <Auth />
              </Route>
              <Route path='/users/profile'>
                <Profile />
              </Route>
            </Switch>
          </main>
        </AuthProvider>
      </Router>
    </>
  );
}
