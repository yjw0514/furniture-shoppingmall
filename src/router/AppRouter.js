import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../context/auth-context';
import Header from '../shared/UIElement/Header';
import Footer from '../shared/UIElement/Footer';
import Auth from '../users/pages/Auth';
import Profile from '../users/pages/Profile';
import NewProduct from '../products/pages/NewProduct';
import Category from '../products/pages/Category';
import ProductList from '../products/pages/ProductList';
import ProductDetail from '../products/components/ProductDetail';
import ShoppingCart from '../users/ShoppingCart';
import './AppRouter.css';

import './AppRouter.css';
export default function AppRouter() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            <Route path='/' exact>
              <ProductList />
            </Route>
            <Route path='/category' exact>
              <Category />
            </Route>
            <Route path='/auth'>
              <Auth />
            </Route>
            <Route path='/new'>
              <NewProduct />
            </Route>
            <Route path='/products/:productId'>
              <ProductDetail />
            </Route>
            <Route path='/users/profile'>
              <Profile />
            </Route>
            <Route path='/cart'>
              <ShoppingCart />
            </Route>
          </Switch>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  );
}
