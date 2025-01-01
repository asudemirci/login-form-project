import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Success from './components/Success';
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
  <div>
  <Switch>
    <Route path="/" exact>
      <Login />
    </Route>
    <Route path="/success">
    <Success />
    </Route>
  </Switch>
  </div>
  )
 }
  
