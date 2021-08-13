import { Route, Switch } from "react-router-dom";
import "./App.css";
import ProductList from "./products/pages/ProductList";
import NewProduct from "./products/pages/NewProduct";

function App() {
  return (
    <div>
      <header>
        <h1>Shopping Mall</h1>
      </header>

      <div id="body">
        <Switch>
          <Route exact={true} path="/">
            <ProductList />
          </Route>
          {/* <Route exact={true} path="/products/:id">
            <ProductPage />
          </Route> */}
          <Route exact={true} path="/products/pages">
            <NewProduct />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
