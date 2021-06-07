import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import "./index.css";
import App from "./App";
import Cart from './Cart';
import ProductList from './ProductList';


ReactDOM.render(
  <React.Fragment>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/product" />
        <Route path="/cart" component={Cart} />
        <Route path="/product" component={ProductList} />
      </Switch>
    </Router>
  </React.Fragment>,
  document.getElementById("root")
);
