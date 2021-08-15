import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../context/auth-context";
import Products from "../product/pages/Products";
import NewProduct from "../products/pages/NewProduct";
import ProductList from "../products/pages/ProductList";
import Header from "../UIElement/Header";
import Auth from "../users/pages/Auth";
import Profile from "../users/pages/Profile";
import ShoppingCart from "../users/ShoppingCart";

import "./AppRouter.css";
export default function AppRouter() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />

          <Switch>
            <Route path="/" exact>
              <ProductList />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/users/profile">
              <Profile />
            </Route>
            <Route path="/new">
              <NewProduct />
            </Route>
            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}
