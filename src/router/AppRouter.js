import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../context/auth-context";
import Header from "../shared/UIElement/Header";
import Footer from "../shared/UIElement/Footer";
import Auth from "../users/pages/Auth";
import Profile from "../users/pages/Profile";
import NewProduct from "../products/pages/NewProduct";

import "./AppRouter.css";
// import Category from "../products/pages/Category";
import ProductList from "../products/pages/ProductList";
import ProductDetail from "../products/components/ProductDetail";
import ShoppingCart from "../users/pages/ShoppingCart";
import PrivateRoute from "./PrivateRoute";
import AdminProduct from "../products/pages/AdminProduct";
import EditProduct from "../products/pages/EditProduct";
import PurchaseList from "../users/pages/PurchaseList";
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
            {/* <Route path="/category" exact>
              <Category />
            </Route> */}
            <Route path="/auth">
              <Auth />
            </Route>
            {/* admin 체크해서 privateRoute 설정해주어야함 */}
            <PrivateRoute path="/admin/new" component={NewProduct} />
            <PrivateRoute path="/admin/products" component={AdminProduct} />
            <PrivateRoute
              path="/admin/edit/:productId"
              component={EditProduct}
            />
            <Route path="/products/:productId">
              <ProductDetail />
            </Route>
            <PrivateRoute path="/users/profile" component={Profile} />
            <PrivateRoute path="/users/cart" component={ShoppingCart} />
            <PrivateRoute path="/users/purchaselist" component={PurchaseList} />
          </Switch>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  );
}
